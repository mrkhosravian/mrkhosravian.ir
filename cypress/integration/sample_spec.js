describe('My First Test', () => {
  it('Visits the mrkhosravian.ir', () => {
    cy.visit('/')

    cy.pause()

    cy.visit('/os/round-robin')
  })
})