const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const UserRoutes = require('./routes/User')
const AuthRoutes = require('./routes/Auth')
const PostRoutes = require('./routes/Post')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB')
})

require('./socket')(io)

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  io.req = req
  req.io = io
  next()
})

app.use('/api/auth', AuthRoutes)
app.use('/api/user', UserRoutes)
app.use('/api/post', PostRoutes)

server.listen(process.env.PORT, () => {
  console.log('Backend server is running')
})
