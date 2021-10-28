describe('Test: Switch to other page', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')

        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('#cp_login').click()
      })

      afterEach(() => {
        cy.get('#cp_nav').click()
        cy.get('#cp_logout').click()
      })

    it('Switch to doors true', function() {

        cy.get('#cp_linktodoors').click()

        cy.url().should('include','/doors')

    })

    it('Switch back from doors true', function() {

        cy.get('#cp_linktodoors').click()

        cy.get('#cp_backfromdoors').click()

        cy.url().should('include','/management')

    })

    it('Switch to users true', function() {

        cy.get('#cp_linktousers').click()

        cy.url().should('include','/users')

    })

    it('Switch back from users true', function() {

        cy.get('#cp_linktousers').click()

        cy.get('#cp_backfromusers').click()

        cy.url().should('include','/management')

    })



})