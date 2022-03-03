import React, { useState, useEffect } from 'react'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(false)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

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

  const handleError = message => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const handleNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      handleError("Wrong username or password")
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {user === null ?
        <div>
          <Error message={error} />
          <Notification message={notification} />
          <p>log in</p>
          <LoginForm 
            handleLogin={handleLogin} 
            username={username} 
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            />
        </div>
        :
        <div>
          <h2>blogs</h2>
          <Error message={error} />
          <Notification message={notification} />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <p></p>
          <Togglable buttonLabel="New blog">
            <NewBlogForm
            reloadBlogs={reloadBlogs}
            handleNotification={handleNotification}
            handleError={handleError} />
          </Togglable>
          <p></p>
          <BlogsList blogs={blogs}/>
        </div>
      }
    </div>
  )
}

export default App