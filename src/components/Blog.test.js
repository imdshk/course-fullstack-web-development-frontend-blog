import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("render content", async () => {
  const blogData = {
    title: "Blog test",
    author: "Jest",
    url: "https://google.com",
    user: {
      name: "Test User"
    }
  }

  const userData = {
    name: "Test User"
  }

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
  const blogData = {
    title: "Blog test",
    author: "Jest",
    url: "https://google.com",
    user: {
      name: "Test User"
    }
  }

  const userData = {
    name: "Test User"
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={ blogData }
      user={ userData }
    />)

  screen.debug()

  const user = userEvent.setup()
  const viewbutton = screen.getByText("view")
  await user.click(viewbutton)

  const element = container.querySelector(".blog-details")
  expect(element).toHaveTextContent("Test User")
  expect(element).toHaveTextContent("https://google.com")
})