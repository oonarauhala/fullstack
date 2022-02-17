import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //reload after adding blog
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    setNewBlog(false)
  }, [newBlog])

  const reloadBlogs = () => {
    setNewBlog(true)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("Error logging in")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
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

  const blogsList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null ?
        <div>
          <p>log in</p>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <p></p>
          <NewBlogForm reloadBlogs={reloadBlogs} />
          <p></p>
          {blogsList()}
        </div>
      }
    </div>
  )
}

const NewBlogForm = ({ reloadBlogs }) => {
  const [blogName, setBlogName] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleNewBlogSubmit = async event => {
    event.preventDefault()
    const newBlog = {
      title: blogName,
      author: blogAuthor,
      url: blogUrl
    }
    await blogService.create(newBlog)
    setBlogName('')
    setBlogAuthor('')
    setBlogUrl('')
    reloadBlogs()
  }

  return (
    <div>
      <h2>create new</h2>
      <p></p>
      <form onSubmit={handleNewBlogSubmit}>
        <div>
          title:
          <input
            value={blogName}
            onChange={({ target }) => setBlogName(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default App