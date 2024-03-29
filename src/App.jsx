import { useState, useEffect } from "react"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Userstatus from "./components/Userstatus"
import BlogForm from "./components/BlogForm"
import Blog from "./components/Blog"
import Toggalable from "./components/Toggalable"

import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState([null, null])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        setBlogs( blogs )
      })
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

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.createBlog(blogObject)
      const existingBlogs = blogs
      const updatedBlogs = existingBlogs.concat(newBlog)
      setBlogs(updatedBlogs)

      setNotificationMessage([
        `a new blog '${newBlog.title}' by '${newBlog.author}' added`,
        "good"
      ])
      setTimeout(() => {
        setNotificationMessage([null, null])
      }, 5000)
    } catch (error) {
      setNotificationMessage([
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ])
      setTimeout(() => {
        setNotificationMessage([null, null])
      }, 5000)
    }
  }

  const handleLikes = async (likeObject) => {
    try {
      await blogService.updateLikes(likeObject)
      const blogToUpdate = blogs.find((blog) => blog.id === likeObject.id)
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      setBlogs(prevState =>
        prevState.map(blog =>
          blog.id !== updatedBlog.id ? blog : updatedBlog
        )
      )
    } catch (error) {
      setNotificationMessage([
        `Error ${error.response.status}: ${error.response.data.error}`,
        "bad"
      ])
      setTimeout(() => {
        setNotificationMessage([null, null])
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${blogToDelete.title} by ${blogToDelete.author}?`)){
      try {
        await blogService.deleteBlog({ id: blogToDelete.id })
        setBlogs(prevState =>
          prevState.filter(blog =>
            blog.id !== blogToDelete.id
          )
        )
        setNotificationMessage([
          `Blog '${blogToDelete.title}' by '${blogToDelete.author}' deleted`,
          "good"
        ])
        setTimeout(() => {
          setNotificationMessage([null, null])
        }, 5000)
      } catch (error) {
        setNotificationMessage([
          `Error ${error.response.status}: ${error.response.data.error}`,
          "bad"
        ])
        setTimeout(() => {
          setNotificationMessage([null, null])
        }, 5000)
      }
    }
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
          <Toggalable buttonLabel="create blog">
            <BlogForm
              createBlog={handleCreateBlog}
            />
          </Toggalable>
          <br />
          <div className="blogs" >
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                updateLikes={handleLikes}
                deleteBlog={handleDeleteBlog}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App