import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} <br/> by {blog.author}
  </div>
)

export default Blog
