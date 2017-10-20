const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config/config')
const bodyParser = require('body-parser')
const { sequelize } = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on PORT ${config.port}`)
  })
