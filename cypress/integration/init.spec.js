describe('Cypress', () => {
  it('is working', () => {
    expect(true).to.equal(true)
  })

  it('opens the app', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Search Knowledge Base').should('be.visible')
  })

  it('handles basic search', () => {
    cy.visit('http://localhost:3000')
    cy.contains('What is software design?').should('not.exist')
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    cy.contains('What is software design?').should('be.visible')
  })

  it('navigates to concept page', () => {
    cy.visit('http://localhost:3000')
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    cy.contains('What is software engineering?').click()
    cy.contains('What is configuration management?').should('be.visible')
  })
})
