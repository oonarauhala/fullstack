import React from 'react'
import Blog from '../components/Blog'

const BlogsList = ({ blogs }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

export default BlogsList