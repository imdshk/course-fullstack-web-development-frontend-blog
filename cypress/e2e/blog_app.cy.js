describe("Empty the test db and display login form", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "Test User",
      username: "testuser",
      password: "123456"
    }

    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:5173/")
    cy.wait(1000)
  })

  it("front page has been opened", function() {
    cy.visit("http://localhost:5173/")
    cy.contains("username")
    cy.contains("password")
  })

  it("User login successful", function() {
    cy.contains("login")
    cy.get("#login-input-username").type("testuser")
    cy.get("#login-input-password").type("123456")
    cy.get("#login-button").click()

    cy.contains("Test User logged in")
  })

  it("User login unsuccessful with red notification", function() {
    cy.contains("login").click()
    cy.get("#login-input-username").type("testuser")
    cy.get("#login-input-password").type("12345")
    cy.get("#login-button").click()

    cy.get("#notification-error").contains("invalid")
    cy.get("#notification-error").should("have.attr", "style", "color: red; background: lightgray; font-size: 20px; padding: 10px; border-style: solid; border-radius: 5px; margin-bottom: 10px;")
  })
})