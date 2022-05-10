describe('Test: Delete User and Doors', function() {
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

      it('Delete user', function() {

        cy.get('[data-cy=linkToUsers]').click()

        cy.contains('bernd')
        .siblings('[data-cy=deleteUser]')               // finds the delete button
        .click()

        cy.get('[data-cy=deleteUserbtn]').click()

        cy.get('[data-cy=userTable]').find('tr').its('length').should('eq', 1)

    })

    it('Delete door', function() {

      cy.get('[data-cy=linkToDoors]').click()

      cy.get("tr td:nth-child(1)")   
      .click()

      cy.get('[data-cy=deleteDoorbtn]').click()

      cy.wait(3000)
      cy.get('[data-cy=doorTable]').find('tr').should('not.exist')

  })

    })
      
      
    