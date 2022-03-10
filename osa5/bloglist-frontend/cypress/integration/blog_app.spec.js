// Backend to be run in dev mode (npm run dev)
// npm run cypress:op

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user  = {
          username: 'Testi',
          name: 'T. Testaaja',
          password: 'asdf'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('log in')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('Testi')
          cy.get('#password').type('asdf')
          cy.contains('login').click()
          cy.contains('T. Testaaja logged in')
        })
    
        it('fails with wrong credentials', function() {
          cy.get('#username').type('Väärä')
          cy.get('#password').type('salasana')
          cy.contains('login').click()
          cy.contains('Wrong username or password')
        })
      })
  })
  