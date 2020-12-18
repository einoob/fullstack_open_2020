import React from 'react'
const Blog = ({ blog }) => (
  <div>
    {blog.title} <br/> &nbsp;&nbsp; by {blog.author}
  </div>
)

export default Blog
