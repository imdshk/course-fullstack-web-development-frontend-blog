import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Userstatus from './components/Userstatus'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState([null, null])
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
          username: username,
          password: password
      })

      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername("")
      setPassword("")
      setNotificationMessage([
        "login successful",
        "good"
      ])
      setTimeout(() => {
        setNotificationMessage([null], [null])
      }, 5000)
    } catch (error) {
      setNotificationMessage([
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ])
      setTimeout(() => {
        setNotificationMessage([null], [null])
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
    blogService.setToken(null)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.createBlog({
      title: title, 
      author: author, 
      url: url
    })
    const existingBlogs = blogs
    const updatedBlogs = existingBlogs.concat(newBlog)
    setBlogs(updatedBlogs)
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <Notification message={notificationMessage}/>
      {user === null ?
        <LoginForm 
          onSubmit={handleLogin}
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
        /> :
        <div>
          <h2>blogs</h2>
          <Userstatus onClick={handleLogout} name={user.name} />
          <br />
          <BlogForm 
            onSubmit={handleCreateBlog}
            title={title}
            author={author}
            url={url}
            onTitleChange={handleTitleChange}
            onAuthorChange={handleAuthorChange}
            onUrlChange={handleUrlChange}
          />
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App