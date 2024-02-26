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

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisibile)
  }

  const showDeleteButton = { display: user.name === blog.user.name ? "" : "none" }

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
      <button onClick={toggleDetailsVisibility} id="blog-button-toggleDetails">{detailsVisibile ? "hide" : "view"}</button>
      <div style={showDetails} className="blog-details">
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
        <br/>
        likes {blog.likes}
        <button onClick={addLikes} id="blog-button-like">like</button>
        <br/>
        {blog.user.name}
        <div style={showDeleteButton} id="blog-delete">
          <button onClick={removeBlog} style={removeButtonStyle}  id="blog-button-delete">delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog