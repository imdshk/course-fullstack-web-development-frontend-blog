import { useState } from "react"

const Blog = ({ blog }) => {
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

  return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <button onClick={toggleDetailsVisibility}>{detailsVisibile ? "hide" : "view"}</button>
    <div style={showDetails}>
      {blog.url}
      <br/>
      likes {blog.likes}
      <button>like</button>
      <br/>
      {blog.user.name}
    </div>
  </div>  
)}

export default Blog