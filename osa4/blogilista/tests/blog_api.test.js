const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(helper.initBlogs[0])
  await blogObj.save()
  blogObj = new Blog(helper.initBlogs[1])
  await blogObj.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initBlogs.length)
})

test('a spesific blog is within returned blogs', async () => {
  const res = await api.get('/api/blogs')
  const titles = res.body.map(r => r.title)

  expect(titles).toContain('keijon seikkailut')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "New amazing amazeness",
    author: "Amazing Andy",
    url: "http://andysalibandy.tv/post",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('New amazing amazeness')
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Invisible indie band",
    url: "http://rockpolice.tv/post",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)
})

test('a spesific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
  .get(`/api/blogs/${blogToView.id}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length - 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('if no likes are given, the field is intialized to zero', async() => {
  
  const blogNoLikes = {
    title: "no likesz",
    author: "disliked person",
    url: "http://zero.likes/nada"
  }

  const postedBlog = await api
  .post('/api/blogs/')
  .send(blogNoLikes)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  const cmp = blogsAtEnd.find((b) => b.title === 'no likesz')
  
  expect(cmp.likes).toEqual(0)
})

test('blog without url is not added', async () => {
  const noUrl = {
    title: "no url",
    author: "urls are vain",
    likes: 99
  }

  const postedBlog = await api
  .post('/api/blogs')
  .send(noUrl)
  .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

test('likes can be updated', async () => {
  
  const newLikes = await helper.blogsInDb()
  newLikes[1].likes += 1
  const updateBlog = newLikes[1]

  await api
  .put(`/api/blogs/${updateBlog.id}`)
  .send(updateBlog)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[1].likes).toBe(helper.initBlogs[1].likes + 1)
})
