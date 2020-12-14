const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const mw = require('../utils/middleware')
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (req, res, next) => {
	const body = req.body
	const saltRounds = 10
	if (body.passwordHash.length < 3 || body.username.length < 3) {
		return res.status(400).json({
			error: 'Username or password shorter than 3 characters'
		})
	}
	const passwdHash = await bcrypt.hash(body.passwordHash, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash: passwdHash
	})

	const savedUser = await user.save()
	res.json(savedUser)
})

usersRouter.get('/', async(req, res) => {
	const users = await User
		.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
	res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter