import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToke) => {
  token = `Bearer ${newToke}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async ({ title, author, url }) => {
  const data = {
    title: title,
    author: author,
    url: url
  }
  const config = {
    headers: {
      "authorization": token
    }
  }
  
  const response = await axios.post(
    baseUrl, 
    data, 
    config
  )
  
  return response.data
}

export default { getAll, createBlog, setToken }