const findPostByIndex = (posts, id) => {
  return posts.findIndex((post) => {
    return post.id === id
  })
}

module.exports = {
  getPosts(req, res) {
    const store = req.store
    res.send(JSON.stringify(store, null, 2))
  },
  addPost(req, res) {
    req.body.id = store.posts.length
    req.store.posts.push(req.body)
    res.status(201).send(req.body)
  },
  updatePost(req, res) {
    const store = req.store
    const id = Number(req.params.id)
    const index = findPostByIndex(store.posts, id)
    if (index > -1) {
      Object.assign(store.posts[index], req.body)
      res.send('Object updated successfully')
    } else {
      res.status(400).send({
        error: "Bad request",
        message: "Id is not present in the set of posts"
      })
    }
  },

  removePost(req, res) {
    const store = req.store
    const id = Number(req.params.id)
    const index = findPostByIndex(store.posts, id)
    if (index > -1) {
      store.posts.splice(index, 1)
      res.send('Object deleted')
    } else {
      res.status(400).send({
        error: 'Bad request',
        message: 'Id is not present in the set of posts'
      })
    }
  }
}
