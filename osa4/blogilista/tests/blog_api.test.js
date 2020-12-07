const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeAll(async () => {
	await User.deleteMany({})
	await api
		.post('/api/users')
		.send({ username: 'superkeijo', name: 'testiKeijo', passwordHash: 'secureaf' })
	const login = await api
		.post('/api/login')
		.send({ username: 'superkeijo', password: 'secureaf'})
	console.log('joopa\n', login.body.token)
	authHeader = 'bearer '.concat(login.body.token)
	console.log('headertoken on', authHeader)
	
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
		await User.deleteOne( {username: 'keijo'} )
		const passwdHsh = await bcrypt.hash('kekeyo', 10)
		console.log(passwdHsh)
		
    const user = new User({username: 'keijo', passwordHash: passwdHsh, name: "Keijo Kuikka"})
    await user.save()
  })

  test('user with a unique username is created', async () => {
		const usersAtStart = await helper.usersInDB()
		console.log('start', usersAtStart)
		
    const newUser = {
      username: 'peke',
      name: 'Pekko Pulkkinen',
      passwordHash: 'pekeyo'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with an existing username is not created', async () => {
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: 'keijo',
      name: 'Keijo Kapanen',
      passwordHash: 'yokeijo'
		}
		
		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await helper.usersInDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	
	test('password shorter than 3 characters is not accepted', async () => {
		const usersAtStart = await helper.usersInDB()
		const newUser = {
			username: 'shorty',
			name: 'Kevin Hart',
			passwordHash: 'kh'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		const usersAtEnd = await helper.usersInDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('username shorter than 3 characters is not accepted', async() => {
		const usersAtStart = await helper.usersInDB()
		const newUser = {
			username: 'kh',
			name: 'Kevin Hart',
			passwordHash: 'shortyo'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		
		const usersAtEnd = await helper.usersInDB()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})

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
    author: "superkeijo",
    url: "http://andysalibandy.tv/post",
    likes: 0
	}
	
  await api
		.post('/api/blogs')
		.set('Authorization', authHeader)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('New amazing amazeness')
})

test('blog is not added without token', async () => {
	const newBlog = {
		title: "token is taken",
    author: "superkeijo",
    url: "http://rockpolice.tv/post",
    likes: 0
	}
  await api
		.post('/api/blogs')
		.set('Authorization', 'bearer ')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "superkeijo",
    url: "http://rockpolice.tv/post",
    likes: 0
	}
  await api
		.post('/api/blogs')
		.set('Authorization', authHeader)
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
	console.log('deleting:', blogToDelete)
	
  await api
	.delete(`/api/blogs/${blogToDelete.id}`)
	.set('Authorization', authHeader)
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initBlogs.length - 1)
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('if no likes are given, the field is intialized to zero', async() => {
  
  const blogNoLikes = {
    title: "no likesz",
    author: "superkeijo",
    url: "http://zero.likes/nada"
	}
  const postedBlog = await api
	.post('/api/blogs/')
	.set('Authorization', authHeader)
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
    author: "superkeijo",
    likes: 99
	}
  const postedBlog = await api
	.post('/api/blogs')
	.set('Authorization', authHeader)
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
	.set('Authorization', authHeader)
  .send(updateBlog)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd[1].likes).toBe(helper.initBlogs[1].likes + 1)
})
