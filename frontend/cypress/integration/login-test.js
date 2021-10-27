describe('Test: First login', function() {
    it('Enter admin and password true with id', function() {

        cy.visit('http://localhost:3001/')

        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('#cp_login').click()

        cy.url().should('include','/management')

    })

    it('Enter admin and password true with class', function() {

        cy.visit('http://localhost:3001/')

        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('.MuiButton-contained').click()

        cy.url().should('include','/management')

    })


    it('Enter admin and password wrong username', function() {

        cy.visit('http://localhost:3001/')

        cy.get('#username').type('ADMIN')
        cy.get('#password').type('admin')
        cy.get('.MuiButton-contained').click()

        cy.url().should('include','/')

    })


    it('Enter admin and password wrong username', function() {

        cy.visit('http://localhost:3001/')

        cy.get('#username').type('admin')
        cy.get('#password').type('1234')
        cy.get('.MuiButton-contained').click()

        cy.url().should('include','/')

    })
})
