import { useState } from "react"

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [detailsVisibile, setDetailsVisible] = useState(false)

  const blogStyle = {
    color: "black",
    background: "lightgray",
    fontSize: 20,
    padding: 10,
    borderStyle: "solid",
    borderRadius: 5,
    BorderColor: "black",
    marginBottom: 10
  }

  const removeButtonStyle = {
    backgroundColor: "#f44336",
    color: "white"
  }

  const showDetails = { display: detailsVisibile ? "" : "none" }

  const showDeleteButton = { display: user.name === blog.user.name ? "" : "none" }
  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisibile)
  }

  const addLikes = (event) => {
    event.preventDefault()
    updateLikes({
      id: blog.id,
      likes: blog.likes + 1
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
    })
  }

  return(
    <div style={blogStyle} className="blog" >
      {blog.title} by {blog.author}
      <button onClick={toggleDetailsVisibility}>{detailsVisibile ? "hide" : "view"}</button>
      <div style={showDetails}>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <br/>
        likes {blog.likes}
        <button onClick={addLikes}>like</button>
        <br/>
        {blog.user.name}
        <div style={showDeleteButton}>
          <button onClick={removeBlog} style={removeButtonStyle}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog