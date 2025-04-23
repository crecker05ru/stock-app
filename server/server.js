// // const sqlite = require('node:sqlite');
// const { DatabaseSync } = require('node:sqlite')
// const database = new DatabaseSync(':memory:')
// // Execute SQL statements from strings.
// database.exec(`
//   CREATE TABLE data(
//     key INTEGER PRIMARY KEY,
//     value TEXT
//   ) STRICT
// `)
// // Create a prepared statement to insert data into the database.
// const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)')
// // Execute the prepared statement with bound values.
// insert.run(1, 'hello')
// insert.run(2, 'world')
// // Create a prepared statement to read data from the database.
// const query = database.prepare('SELECT * FROM data ORDER BY key')
// // Execute the prepared statement and log the result set.
// console.log(query.all())
// // Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]

// // const http = require('http')
// import http from 'http'
// import sqlite from 'node:sqlite'
// import fs from 'fs'
// import path from 'path'
// import db from './database.db'

// // const dbPath = path.resolve(__dirname, 'database.db')
// const database = new sqlite.DatabaseSync('./database.db')
// // Execute SQL statements from strings.
// database.exec(`
//   CREATE TABLE data(
//     key INTEGER PRIMARY KEY,
//     value TEXT
//   ) STRICT
// `)
// // Create a prepared statement to insert data into the database.
// const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)')
// // Execute the prepared statement with bound values.
// insert.run(1, 'hello')
// insert.run(2, 'world 1')
// // Create a prepared statement to read data from the database.
// const query = database.prepare('SELECT * FROM data ORDER BY key')
// // Execute the prepared statement and log the result set.
// console.log(query.all())
// // Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
// const hostname = '127.0.0.1'
// const port = 3000
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World 2\n')
// })
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

// const app = express()

// // your beautiful code...

// if (import.meta.env.PROD) app.listen(3000)

// console.log('import.meta.env.PROD', import.meta.env.PROD)

// export const viteNodeServer = app
// console.log('app', app)

// import http from 'http'

// const requestListener = (req, res) => {
//   res.writeHead(200)
//   res.end('raw node server!~!')
// }

// if (import.meta.env.PROD) {
//   const server = http.createServer(requestListener)
//   server.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000')
//   })
// }

// export const viteNodeServer = requestListener

// import express from 'express'

// const app = express()

// app.get('/', (req, res) => {
//   res.send('change me to see updates, express~!')
// })

// app.get('/ip', async (req, res) => {
//   // const resp = await fetch('https://api.ipify.org?format=json')
//   // const json = await resp.json()
//   res.json({ response: 'res' })
// })

// if (import.meta?.env?.PROD) {
//   app.listen(3000)
//   console.log('listening on http://localhost:3000/')
// }

// export const viteNodeServer = app

import sqlite3 from 'sqlite3'
import ExcelJS from 'exceljs'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const workbook = new ExcelJS.Workbook()
const urlencodedParser = express.urlencoded({ extended: false })
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.options('*', cors())
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `example.com`)
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`)
  res.header(`Access-Control-Allow-Headers`, `Content-Type`)
  next()
}

// app.configure(() => {
//   app.use(express.bodyParser())
//   app.use(express.cookieParser())
//   app.use(express.session({ secret: `cool beans` }))
//   app.use(express.methodOverride())
//   // CORS middleware
//   app.use(allowCrossDomain)
//   app.use(app.router)
//   app.use(express.static(`public`))
// })

// app.get('/*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })

app.get('/', (req, res) => {
  res.send('change me to see updates, express~!')
})

app.get('/ip', async (req, res) => {
  // const resp = await fetch('https://api.ipify.org?format=json')
  // const json = await resp.json()
  res.json({ response: 'res' })
})

if (import.meta?.env?.PROD) {
  app.listen(3000)
  console.log('listening on http://localhost:3000/')
}

app.listen(3000)
export const viteNodeServer = app
const dbPath = './server/database.db'
const db = new sqlite3.Database(dbPath)
sqlite3
const chinook = new sqlite3.Database('./server/chinook.db')
const exceldatabse = new sqlite3.Database('./server/exceldatabase.db')
console.log({ db })

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

async function importExcelToSQLite(excelFilePath, dbFilePath, tableName) {
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

// Использование
// importExcelToSQLite('./server/rezprice.xlsx', './server/exceldatabase.db', 'tires').catch((err) =>
//   console.error('Ошибка:', err),
// )

const sqlInsert = `INSERT INTO products(name, price) VALUES(?, ?)`

chinook.serialize(() => {
  console.log({ chinook })
  // chinook.get('SELECT * FROM products', (err, res) => {
  //   console.error('chinook err', err)
  //   console.log('chinook res', res)
  // })

  chinook.all("select name from sqlite_master where type='table'", function (err, tables) {
    console.log('tables', tables)
  })
})

db.serialize(() => {
  console.log({ db })
  // db.run('CREATE TABLE lorem (info TEXT)')
  // db.run('CREATE TABLE users3 (name TEXT, age INTEGER)')
  // db.run(`INSERT INTO users3 (name, age) VALUES ('Tom', 37)`)
  // db.run(`INSERT INTO users3 VALUES (?,?)`, 'Alice', 29)
  // const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
  // for (let i = 0; i < 10; i++) {
  //   stmt.run('Ipsum ' + i)
  // }
  // stmt.finalize()

  // db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
  //   console.log(row.id + ': ' + row.info)
  // })

  // db.get('SELECT * FROM users3', (err, res) => {
  //   console.error('err', err)
  //   console.log('res', res)
  // })
})

app.get('/db', async (req, res) => {
  // const resp = await fetch('https://api.ipify.org?format=json')
  // const json = await resp.json()
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  db.get('SELECT * FROM users3', (err, row) => {
    console.error('err', err)
    console.log('res', row)
    const json = res.json({ response: row })
    return json
  })
})

app.post('/db/run', async function (req, res) {
  console.log('req.body', req.body)
  // const json = res.json(req)
  db.run(`${req.body.value}`, (err, row) => {
    // const json = res.json({ response: row })
    console.log('db.run err', err)
    console.log('run row', row)
    res.send(row)
  })
  // res.send('ok')
})

app.post('/db/execute', async function (req, res) {
  console.log('req.body', req.body)
  db.exec(`${req.body.value}`, (row) => {
    // const json = res.json({ response: row })
    console.log('db.exec err', err)
    console.log('exec row', row)
    res.send(row)
  })
  // res.send('ok')
})

app.get('/chinook', async (req, res) => {
  // const resp = await fetch('https://api.ipify.org?format=json')
  // const json = await resp.json()
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  chinook.get('SELECT * FROM products', (err, row) => {
    console.error('err', err)
    console.log('chinook res', row)
    res.send(row)
  })
})

app.get('/exceldatabase/1', async (req, res) => {
  exceldatabse.get('SELECT * FROM tires', (err, row) => {
    console.error('err', err)
    console.log('exceldatabase res', row)
    res.send(row)
  })
})

app.get('/exceldatabase', async (req, res) => {
  exceldatabse.all('SELECT * FROM tires LIMIT 100', (err, row) => {
    console.error('err', err)
    console.log('exceldatabase res', row)
    res.send(row)
  })
})

app.get('/tables', (req, res) => {
  chinook.all("SELECT name FROM sqlite_master WHERE type='table'", function (err, tables) {
    console.log('all err', err)
    console.log('tables', tables)
    res.send({ tables })
  })
})
app.post('/chinook/execute', async (req, res) => {
  console.log('req.body', req.body)
  if (!`${req.body.value}`) {
    res.send('no query')
  }
  try {
    await execute(chinook, `${req.body.value}`)
    // chinook.all('SELECT * FROM products', function (err, products) {
    //   console.log('all err', err)
    //   console.log('products', products)
    //   res.send({ products })
    // })
    await all(chinook, `SELECT * FROM products`)
      .then((products) => {
        console.log('products', products)
        res.send({ products })
      })
      .catch((err) => console.log('all err', err))
  } catch (error) {
    console.log('/chinook/execute', error)
    res.send('chinook error', error)
  } finally {
    // res.send('chinook success')
  }
})

app.post('/chinook/insert', async (req, res) => {
  try {
    await insert(chinook, sqlInsert, ['iPhone', 899.99])
  } catch (error) {
    console.log(error)
  } finally {
    // chinook.close()
    res.send('chinook insert success')
  }
})

// db.close()
