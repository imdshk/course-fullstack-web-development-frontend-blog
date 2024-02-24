import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
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

  const showDetails = { display: detailsVisibile ? "" : "none" }

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

  return(
  <div style={blogStyle}>
    {blog.title} by {blog.author}
    <button onClick={toggleDetailsVisibility}>{detailsVisibile ? "hide" : "view"}</button>
    <div style={showDetails}>
      <a href={blog.url} target="_blank">{blog.url}</a>
      <br/>
      likes {blog.likes}
      <button onClick={addLikes}>like</button>
      <br/>
      {blog.user.name}
    </div>
  </div>  
)}

export default Blog