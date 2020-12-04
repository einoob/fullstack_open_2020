const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { usersInDB } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
	//const blogs = await Blog.find({})
	const blogs = await Blog
			.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  
    const blog = await Blog.findById(request.params.id)
		if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

  const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
  })
  
	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
	
	const blog = await Blog.findById(request.params.id)
	console.log('id', request.params.id)
	console.log('blog', blog)
	
	
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid'} )
	}
	const user = await User.findById(decodedToken.id)
	console.log('user', user)
	console.log('user_id', user._id.toString())
	console.log('blog.user.id', blog.user.toString())
	
	
	if (user._id.toString() === blog.user.toString()) {
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}
	else {
		response.status(401).json( {error: 'no blog found' })
	}
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
