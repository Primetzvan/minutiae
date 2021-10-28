describe('Test: Switch to other page', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3001/')

        cy.get('[data-cy=username]').type('admin')
        cy.get('[data-cy=password]').type('admin')
        cy.get('[data-cy=login]').click()
      })

      afterEach(() => {
        cy.get('[data-cy=nav]').click()
        cy.get('[data-cy=logout]').click()
      })

    it('Switch to doors true', function() {

        cy.get('[data-cy=linkToDoors]').click()

        cy.url().should('include','/doors')

    })

    it('Switch back from doors true', function() {

        cy.get('[data-cy=linkToDoors]').click()

        cy.get('[data-cy=backFromDoors]').click()

        cy.url().should('include','/management')

    })

    it('Switch to users true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.url().should('include','/users')

    })

    it('Switch back from users true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.get('[data-cy=backFromUsers]').click()

        cy.url().should('include','/management')

    })


    it('Switch back from users true', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.get('[data-cy=userDetail]').click()

        cy.url().should('include','/userdetail')

    })

    



})