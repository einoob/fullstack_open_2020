const Blog = require('../models/blog')
const User = require('../models/user')

const initBlogs = [
	{
    "author": "superkeijo",
    "title": "keijon seikkailut",
    "url": "http://keijo.gg/post1",
    "likes": 420,
    "id": "5fa2c6c8e69e60ee3f3cc23a"
  },
  {
    "author": "peke",
    "title": "peken panojutut",
    "url": "http://peke.gg/post1",
    "likes": 69,
    "id": "5fa2cc1c95db7b04e01a241f"
  }
]

const nonExistingId = async() => {
	const blog = new Blog({
		title: 'No ID',
		author: 'No author',
		url: 'http://nonothing.no',
		likes: 0
	})

	return blog._id.toString()
}

const  blogsInDb = async () => {
  const blogs = await Blog.find({})
 // console.log(blogs.map(b => b.id));
	return blogs.map(b => b.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


const getAuthHeader = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWQiOiI1ZmM4ZTdkMDJjMWMyMTJmODI4ODNhMGUiLCJpYXQiOjE2MDcwODcwODh9.74-izI3cFZkQ-hNCZS2-FAt2FJlPrPU5Ytw2E2iumjc'

module.exports = {
	initBlogs, nonExistingId, blogsInDb, usersInDB, getAuthHeader
}