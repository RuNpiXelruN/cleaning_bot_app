const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')
require('dotenv').config({silent: true})

const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

// -------------------- ROUTES --------------------

app.get('/', (req, res) => {
  res.send('Heyyyy')
})

// -------------------- ROUTES /> -----------------


app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({err: err.message })
})

const server = app.listen(5000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Listening on http:${host}:${port}`)
})
