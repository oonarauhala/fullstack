import React from 'react'
import Blog from './Blog'

const BlogsList = ({ blogs, handleLike }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
      )}
    </div>
  )

export default BlogsList