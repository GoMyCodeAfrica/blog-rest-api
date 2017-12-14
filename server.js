const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const routes = require('./routes')
const app = express()

const PORT = process.argv[2] || 3000
const store = require('../blogs.json')

app.use(logger('dev'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  req.store = store
  next()
})

app.get('/posts', routes.posts.getPosts)
app.post('/posts', routes.posts.addPost)
app.put('/posts/:id', routes.posts.updatePost)
app.delete('/posts/:id', routes.posts.removePost)

// To do
app.get('/posts/:id/comments', routes.comments.getComments)
app.post('/posts/:id/comments', routes.comments.addComment)
app.put('/posts/:pos_id/comments/:com_id', routes.comments.updateComment)
app.delete('/posts/:pos_id/comment/:com_id', routes.comments.removeComment)

// dev mode error handler
app.use(errorHandler())

app.listen(PORT, () => {
  console.log('server is up and running at port ', PORT)
})
