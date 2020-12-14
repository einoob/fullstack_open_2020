const dummy = (blogs) => {
	return (1)
}

const totalLikes = (blogs) => {
	const likes = blogs.map(b => b.likes)
	const result = likes.reduce((a, b) => a + b, 0)
	return (result)
}

const favoriteBlog = (blogs) => {
	const max = 
	blogs
	.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
	return (max)
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}