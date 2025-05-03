export async function importExcelToSQLite(excelFilePath, dbFilePath, tableName) {
  // Открываем базу данных SQLite
  const db = new sqlite3.Database(dbFilePath)

  // Читаем Excel файл
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(excelFilePath)

  // Берем первый лист
  const worksheet = workbook.getWorksheet(1)

  // Получаем заголовки столбцов (первая строка)
  const headers = []
  console.log('worksheet', worksheet)
  worksheet.getRow(1).eachCell((cell, colNumber) => {
    console.log('cell', cell)
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
