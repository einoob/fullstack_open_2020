import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [newBlog, setNewBlog] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogger')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const logoutUser = () => {
		window.localStorage.removeItem('loggedBlogger')
		setUser(null)
		setUsername('')
		setPassword('')
	}

	const loginForm = () => {
		return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
				type="text"
				value={username}
				name="Username"
				onChange={({ target}) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
				type="password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
		)
	}

	const blogForm = () => {
		const userJSON = window.localStorage.getItem('loggedBlogger')
		if (!userJSON) {
			return (
				<div>
					lolxd KEIJO
				</div>
			)
		}
		const showUser = JSON.parse(userJSON)
		return (
			<div>
				{showUser.name} logged in <br/>
				<button type="submit" onClick={logoutUser}>logout</button>
			</div>
		)
			
		/*<form onSubmit={addBlog}>
				<input
				value={newBlog}
				onChange={handleBlogChange}
				/>
				<button type="submit">save</button>
			</form>*/
		}
		
	
	const handleLogin = async (event) => {
		event.preventDefault()
	try {
		const user = await loginService.login({
			username, password
		})
		window.localStorage.setItem(
			'loggedBlogger', JSON.stringify(user)
		)
		blogService.setToken(user.token)
		setUser(user)
		setUsername('')
		setPassword('')
	} catch (exception) {
		setErrorMessage('wrong credentials')
		setTimeout(() => {
			setErrorMessage(null)
		}, 5000)
	}
}

  return (
    <div>
			<h1>Keijon pislablogit</h1>
			{user === null && loginForm(username, setUsername, password, setPassword, handleLogin)}
			{user !== null && blogForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App