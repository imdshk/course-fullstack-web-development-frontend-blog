import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import BlogForm from "./BlogForm"

const blogData = {
  title: "Blog test",
  author: "Jest",
  url: "https://google.com",
  likes: 10,
  user: {
    name: "Test User"
  }
}

const userData = {
  name: "Test User"
}

test("render content", async () => {
  render(
    <Blog
      blog={ blogData }
      user={ userData }
    />
  )

  const element = screen.getByText("Blog test by Jest")
  expect(element).toBeDefined()
})

test("click view button to show details", async () => {
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={ blogData }
      user={ userData }
    />)

  const user = userEvent.setup()
  const viewbutton = screen.getByText("view")
  await user.click(viewbutton)

  const element = container.querySelector(".blog-details")
  expect(element).toHaveTextContent("Test User")
  expect(element).toHaveTextContent("https://google.com")
})

test("click like button twice", async () => {
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={ blogData }
      user={ userData }
      updateLikes={ mockHandler }
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText("view")
  await user.click(viewButton)

  const likeButton = screen.getByText("like")
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test("create new blog and calls onSubmit", async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const { container } = render(
    <BlogForm
      createBlog={ mockHandler }
    />
  )

  const inputTitle = container.querySelector("#blog-input-title")
  const inputAuthor = container.querySelector("#blog-input-author")
  const inputUrl = container.querySelector("#blog-input-url")
  const createButton = screen.getByText("create")

  await user.type(inputTitle, "This is a title")
  await user.type(inputAuthor, "This is an author")
  await user.type(inputUrl, "This is an url")
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe("This is a title")
  expect(mockHandler.mock.calls[0][0].author).toBe("This is an author")
  expect(mockHandler.mock.calls[0][0].url).toBe("This is an url")
})