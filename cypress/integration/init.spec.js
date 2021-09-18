describe('Cypress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  // it('is working', () => {
  //   expect(true).to.equal(true)
  // })

  it('opens the app', () => {
    cy.contains('Search Knowledge Base').should('be.visible')
  })

  it('handles basic search', () => {
    cy.contains('Software Design').should('not.exist')
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    cy.contains('Software Design').should('be.visible')
  })

  it('navigates to concept page', () => {
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    cy.contains('Software Engineering').click()
    cy.contains('Configuration Management').should('be.visible')
  })

  it('navigates to concept page', () => {
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    cy.contains('Software Engineering').click()
    cy.contains('Configuration Management').should('be.visible')
  })

  it('navigates to review page', () => {
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')

    cy.contains('Software Engineering').click()
    cy.contains('Review Concept').click()
    cy.contains('What are software requirements?').should('be.visible')
    cy.contains('Show Answer').should('be.visible')
    cy.contains('Due date').should('be.visible')
  })

  it('shows to answer', () => {
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')

    cy.contains('Software Engineering').click()
    cy.contains('Review Concept').click()
    cy.contains('What are software requirements?').should('be.visible')
    cy.contains('Show Answer').click()
    cy.contains('Software requirements express the needs').should('be.visible')
  })

  it('shows response buttons', () => {
    cy.get('#search-input')
      .should('be.visible')
      .type('software{enter}')
    
    cy.contains('Software Engineering').click()
    cy.contains('Review Concept').click()
    cy.contains('What are software requirements?').should('be.visible')
    cy.contains('Show Answer').click()
    cy.contains('Software requirements express the needs').should('be.visible')
  })
})
