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
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import {
  importExcelToSQLite,
  all,
  selectAllFromTable,
  execute,
  insert,
  fetchAll,
  fetchFirst,
  fetchTableHeaders,
  fetchTableHeadersWithPragma,
} from './utils.js'

const serverPath = './server/'
// const upload = multer({
//   dest: './server/uploads/',
//   filename: function (req, file, cb) {
//     // Генерируем новое имя файла
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     const ext = path.extname(file.originalname) // Получаем расширение файла
//     cb(null, file.originalname)
//   },
// })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.originalname)
  },
})

// const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
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
const chinook = new sqlite3.Database('./server/chinook.db')
const exceldatabse = new sqlite3.Database('./server/exceldatabase.db')
console.log({ db })

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

app.post('/import/db', upload.single('file'), async (req, res) => {
  console.log('req?.file', req?.file)
  // const filePath = fs.readFile(req.file.path, (err, data) => {
  //   if (err) {
  //     return res.status(500).send('Error reading file')
  //   }
  //   return data.toString()
  // })

  const contentDisposition = req.headers['content-disposition']
  const contentType = req.headers['content-type']
  console.log('contentDisposition', contentDisposition)
  console.log('contentType', contentType)

  const data = {
    chunks: req?.file?.buffer || [],
    fileTargetPath: req.file.path,
    fileOutputPath: serverPath,
    dbName: req?.file?.originalname,
  }
  console.log('data', data)

  // req.on('data', (chunk) => {
  //   data.chunks.push(chunk)
  // })

  // req.on('end', () => {
  //   const buffer = Buffer.concat(data.chunks)
  //   // Save or process the buffer (which contains the file data)
  //   console.log('buffer', buffer)
  //   fs.writeFile('./server/uploads/uploaded-file', buffer, (err) => {
  //     if (err) {
  //       return res.status(500).send('Error saving file')
  //     }
  //     const filename = path.basename('./server/uploads/uploaded-file')
  //     console.log('filename', filename)
  //     res.send('File uploaded successfully')
  //   })
  // })

  // importExcelToSQLite(sqlite3, data.fileTargetPath, data.fileOutputPath, data.dbName).catch(
  //   (err) => {
  //     console.error('Ошибка:', err)
  //     // res.status(500).send('Error importing file')
  //   },
  // )
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

app.post('/exceldatabase/headers', async (req, res) => {
  console.log('/exceldatabase/headers req', req.body)
  if (!req?.body?.tableName) {
    res.send('no table name')
  } else {
    fetchTableHeadersWithPragma(exceldatabse, req?.body?.tableName, true)
      .then((data) => {
        console.log('fetchTableHeaders data', data)
        res.send(data)
      })
      .catch((e) => console.log('fetchTableHeaders error', e))
  }
})

app.get('/exceldatabase', async (req, res) => {
  console.error('app.get req?.query', req?.query)
  console.error('app.get req?.params', req?.params)
  const limit = 24
  const offset = req?.query?.page ? req?.query?.page * limit : 0
  exceldatabse.all(
    `SELECT * FROM tires ${req?.query?.search ? `WHERE name LIKE '%${req?.query?.search}%'` : ''} LIMIT ${limit} OFFSET ${offset}`,
    (err, row) => {
      console.error('err', err)

      // console.error('app.get res', res)
      // console.log('exceldatabase res', row)
      exceldatabse.get(
        `SELECT COUNT(*) AS total_count FROM tires ${req?.query?.search ? `WHERE name LIKE '%${req?.query?.search}%'` : ''}`,
        (err, row2) => {
          res.send({ data: row, total: row2?.total_count })
        },
      )
    },
  )
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
