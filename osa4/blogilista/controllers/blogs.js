const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  
  try { 
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  }
  catch (error) {
    console.log(error);
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
  })

  try {
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  } 
  catch (error) {
    next(error)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {

  try {
    const blog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  catch (error) {
    next(error)
  }
  /*
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))*/
})

/*blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})*/

module.exports = blogsRouter