// implement your server here
// require your posts router and connect it here

const express = require('express');

const server = express()
const postsRouter = require('./posts/posts-router')

//MIDDLEWARE
server.use(express.json())
server.use('/api/posts', postsRouter)


server.get('/', (req, res) => {
  console.log('test .get()')
})

module.exports = server;