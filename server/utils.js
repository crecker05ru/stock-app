import ExcelJS from 'exceljs'
import { promisify } from 'util'

export async function importExcelToSQLite(sqlite3, excelFilePath, dbFilePath, tableName) {
  // Открываем базу данных SQLite
  const db = new sqlite3.Database(dbFilePath)

  // Читаем Excel файл
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(excelFilePath)

  // Берем первый лист
  const worksheet = workbook.getWorksheet(1)

  // Получаем заголовки столбцов (первая строка)
  const headers = ['id']
  console.log('worksheet', worksheet)
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    console.log('cell.value', cell.value)
    headers.push(cell.value)
  })

  // Создаем таблицу в SQLite
  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      ${headers.map((header) => `"${header}" TEXT`).join(', ')}
  )`

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Ошибка при создании таблицы:', err)
      return
    }

    console.log(`Таблица "${tableName}" создана или уже существует`)

    // Вставляем данные построчно
    const insertStmt = db.prepare(
      `INSERT INTO ${tableName} (${headers.map((h) => `"${h}"`).join(', ')}) VALUES (${headers.map(() => '?').join(', ')})`,
    )

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return // Пропускаем заголовки

      const rowData = []
      rowData.push(rowNumber)
      row.eachCell({ includeEmpty: true }, (cell) => {
        rowData.push(cell.value)
      })

      insertStmt.run(rowData, (err) => {
        if (err) {
          console.error('Ошибка при вставке строки:', rowNumber, err)
        }
      })
    })

    insertStmt.finalize(() => {
      console.log('Импорт завершен')
      db.close()
    })
  })
}

export const all = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.all(sql, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

export const selectAllFromTable = async (db, table) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table}`, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

export const execute = async (db, sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export const insert = async (db, sql, params = []) => {
  if (params && params.length > 0) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

export const fetchAll = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

export const fetchFirst = async (db, sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err)
      resolve(row)
    })
  })
}

export const fetchTableHeaders = async (db, tableName) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM ${tableName} LIMIT 1`, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

export const fetchDistinctValue = async (db, tableName, columnName) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT ${columnName}
      FROM ${tableName}`,
      (err, res) => {
        console.log('fetchDistinctValue res', res)
        if (err) reject(err)
        resolve(res)
      },
    )
  })
}

export const fetchDistinctValues = async (db, tableName) => {
  db.allAsync = promisify(db.all)
  db.runAsync = promisify(db.run)
  db.getAsync = promisify(db.get)
  let response
  const result = {}

  const tableInfo = await db.allAsync(`PRAGMA table_info(${tableName})`)
  const ignoreFields = [
    'id',
    'name',
    'model',
    'updated_at',
    'description',
    'image',
    'count',
    'article',
    'reviews',
    'price',
  ]
  const filteredTableInfo = tableInfo.filter((i) => !ignoreFields.includes(i.name))
  console.log('filteredTableInfo', filteredTableInfo)

  for (const col of filteredTableInfo) {
    response = await all(
      db,
      `SELECT DISTINCT ${col.name} FROM ${tableName} WHERE ${col.name} IS NOT NULL`,
    )
    result[col.name] = response
    console.log(`response`, response)
  }

  console.log(`result`, result)

  // return new Promise((resolve, reject) => {
  //   resolve(result)
  // })
  return result
}

export const fetchTableHeadersWithPragma = async (db, tableName, withConfig = false) => {}

export const getUniqueValues = async (db, tableName) => {
  // Промсифицируем методы
  db.allAsync = promisify(db.all)
  db.runAsync = promisify(db.run)
  let response
  let result = {}
  try {
    // Получаем информацию о таблице
    const tableInfo = await db.allAsync(`PRAGMA table_info(${tableName})`)
    const ignoreFields = [
      'id',
      'name',
      'model',
      'updated_at',
      'description',
      'image',
      'count',
      'article',
      'reviews',
      'price',
    ]
    const filteredTableInfo = tableInfo.filter((i) => !ignoreFields.includes(i.name))
    console.log('filteredTableInfo', filteredTableInfo)

    // Создаем SQL для новой таблицы
    const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName}_unique_values (
    ${filteredTableInfo.map((col) => `${col.name} ${col.type}`).join(', ')}
  )`
    response = await db.runAsync(createTableSQL)

    // Для каждого столбца
    for (const col of filteredTableInfo) {
      console.log('col.name', col.name)
      try {
        await db.allAsync(
          `
          INSERT OR IGNORE INTO ${tableName}_unique_values(${col.name})
          SELECT DISTINCT ${col.name} FROM ${tableName}
          WHERE ${col.name} IS NOT NULL
        `,
          (err, row) => (result[col.name] = row),
        )

        console.log(`Обработан столбец: ${col.name}`)
        // return result
      } catch (colErr) {
        console.error(`Ошибка в столбце ${col.name}:`, colErr.message)
        return response
      }
    }

    console.log('Все уникальные значения сохранены')
    console.log('result', result)
    return result
  } catch (err) {
    console.error('Критическая ошибка:', err)
  } finally {
  }
}
