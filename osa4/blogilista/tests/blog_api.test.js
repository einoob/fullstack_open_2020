const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initBlogs = [
  {
    "author": "keijo",
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initBlogs[1])
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

  expect(response.body).toHaveLength(initBlogs.length)
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

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initBlogs.length + 1)
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

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

