describe("template spec", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.visit("http://localhost:5173/")

  })

  it("front page has been opened", function() {
    cy.visit("http://localhost:5173/")
    cy.contains("username")
    cy.contains("password")
  })
})