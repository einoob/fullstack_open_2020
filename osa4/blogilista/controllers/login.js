const getToken = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
	const body = req.body
	const user = await User.findOne({ username: body.username })
	const pwCorrect = user === null
		? false : await bcrypt.compare(body.password, user.passwordHash)
	
	if (!(user && pwCorrect)) {
		return res.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = getToken.sign(userForToken, process.env.SECRET)

	res
		.status(200)
		.send({ token, username: user.username, name: user.name} )
})

module.exports = loginRouter
