import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState([null, null])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      setUser(user)
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
          <p>{user.name} logged in</p>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App