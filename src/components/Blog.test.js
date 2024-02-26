import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("render content", () => {
  const blog = {
    title: "Blog test",
    author: "Jest",
    url: "https://google.com",
    user: {
      name: "Test User"
    }
  }

  const user = {
    name: "Test User"
  }

  render(<Blog blog={ blog } user={ user } />)

  const element = screen.getByText("Blog test by Jest")
  expect(element).toBeDefined()
})