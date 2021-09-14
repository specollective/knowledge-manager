describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true)
  })

  it('opens the app', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Welcome').should('be.visible')
    cy.contains('Formal Sciences').should('be.visible')
    cy.contains('Social Sciences').should('be.visible')

  })
})
