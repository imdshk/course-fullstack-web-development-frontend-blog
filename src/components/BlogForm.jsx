import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("") 

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title, 
      author: author, 
      url: url
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }           
  
  return(
    <form onSubmit={addBlog}>
      <div>
      title:
      <input 
        value={title}
        onChange={handleTitleChange}
        type="text"
      />
      </div>
      <div>
      author:
      <input 
        value={author}
        onChange={handleAuthorChange}
        type="text"
      />
      </div>
      <div>
      url:
      <input 
        value={url}
        onChange={handleUrlChange}
        type="text"
      />
      </div>
      <button type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm