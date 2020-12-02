const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
	const body = req.body
	const saltRounds = 10
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
	const users = await User.find({})
	res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter