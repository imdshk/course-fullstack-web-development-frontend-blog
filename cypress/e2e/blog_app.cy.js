describe("Blog app", function() {
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

    it("User login unsuccessful with red notification", function() {
      cy.contains("login").click()
      cy.get("#login-input-username").type("testuser")
      cy.get("#login-input-password").type("12345")
      cy.get("#login-button").click()

      cy.get("#notification-error").contains("invalid")
      cy.get("#notification-error").should("have.attr", "style", "color: red; background: lightgray; font-size: 20px; padding: 10px; border-style: solid; border-radius: 5px; margin-bottom: 10px;")
    })

    it("User login successful", function() {
      cy.contains("login")
      cy.get("#login-input-username").type("testuser")
      cy.get("#login-input-password").type("123456")
      cy.get("#login-button").click()

      cy.contains("Test User logged in")
    })

    describe("When user logged in", function() {
      beforeEach(function() {
        cy.visit("http://localhost:5173/")
        cy.contains("login")
        cy.get("#login-input-username").type("testuser")
        cy.get("#login-input-password").type("123456")
        cy.get("#login-button").click()

        cy.contains("Test User logged in")
      })

      it("A blog can be created", function() {
        cy.get("#blog-button-show-create").click()
        cy.get("#blog-input-title").type("This is a test Blog from Cypress Integration Test")
        cy.get("#blog-input-author").type("Cypress Test")
        cy.get("#blog-input-url").type("https://docs.cypress.io/")
        cy.get("#blog-button-create").click()
      })

      describe("When a blog is created", function() {
        beforeEach(function() {
          cy.get("#blog-button-show-create").click()
          cy.get("#blog-input-title").type("This is a test Blog from Cypress Integration Test")
          cy.get("#blog-input-author").type("Cypress Test")
          cy.get("#blog-input-url").type("https://docs.cypress.io/")
          cy.get("#blog-button-create").click()
        })

        it("A user can like a blog", function() {
          cy.get("#blog-button-toggleDetails").click()

          cy.get("#blog-button-like").click()
          cy.get(".blog-details").contains("likes 1")
        })

        it("A user who created a blog can delete", function() {
          cy.get("#blog-button-toggleDetails").click()

          cy.get("#blog-button-delete").click()
          cy.on("windows:confirm", function() {
            true
          })
          cy.get(".blog-details").should("not.exist")
        })
      })
    })
  })
})