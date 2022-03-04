import React from 'react'
import { useState } from 'react'

const Blog = ({blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (visible) {
    return (
      <div>
        <div style={blogStyle}>
          <div>
            <p>{blog.title} {blog.author}</p>
            <p>{blog.url}</p>
            <div>
              {blog.likes}
              <button onClick={() => handleLike(blog)}>like</button>
            </div>
            <p>{blog.user.username}</p>
          </div>
          <button onClick={toggleVisibility}>hide</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
        </div>
        <button onClick={toggleVisibility}>view</button>
      </div> 
    </div>
  )
}

export default Blog