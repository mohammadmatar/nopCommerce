
describe('User Registration and Authentication', () => {
  beforeEach(() => {
    cy.fixture('InformationData').as("InformationData")
    cy.visit('/')
  })

  it('Verify the user can open the website', () => {
    cy.get('[alt="nopCommerce demo store"]').should('be.visible');
    cy.get('img').filter('[alt="nopCommerce demo store"]');

  })
  
//registration
  it('Verify registration page accessibility', () => {
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('.page-title').should('contain', 'Register')
  })

  it('Verify the user can register with valid information', () => {
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#FirstName').type(user.Fname);
      cy.get('#LastName').type(user.Lname);
      cy.get('#Email').type(user.Email);
      cy.get('#Password').type(user.Password);
      cy.get('#ConfirmPassword').type(user.Password);
    })
    cy.get('#register-button').click();
    cy.get('.result').should('be.visible');
    cy.get('.result').should('be.visible').should('contain', 'Your registration completed');
    cy.get('.result').invoke('text').then((text) => expect('Your registration completed').eql(text));
    cy.get('.register-continue-button').click();
  })

  it('Verify the user cannot register with already registered information', () => {
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#FirstName').type(user.Fname);
      cy.get('#LastName').type(user.Lname);
      cy.get('#Email').type(user.Email);
      cy.get('#Password').type(user.Password);
      cy.get('#ConfirmPassword').type(user.Password);
    })
    cy.get('#register-button').click();
    cy.get('.message-error > ul > li').invoke('text').then((text) => expect('The specified email already exists').eql(text));
  })

  it('Verify the user cannot register with blank fields.', () => {
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('#register-button').click();
    cy.get('#FirstName-error').should('be.visible').and('contain', 'First name is required.');
    cy.get('#LastName-error').should('be.visible').and('contain', 'Last name is required.');
    cy.get('#Email-error').should('be.visible').and('contain', 'Email is required.');
    cy.get('#Password-error').should('be.visible').and('contain', 'Password is required.');
    cy.get('#ConfirmPassword-error').should('be.visible').and('contain', 'Password is required.');
  })

  it('Verify the user cannot register with invalid information.', () => {
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('#FirstName').type('1');
    cy.get('#LastName').type('1');
    cy.get('#Email').type('1');
    cy.get('#Password').type('1');
    cy.get('#ConfirmPassword').type('12');
    cy.get('#register-button').click();
    cy.get('#Email-error').should('be.visible').and('contain', 'Wrong email');
    cy.get('#Password-error').should('be.visible').and('contain', 'must have at least 6 characters');
    cy.get('#ConfirmPassword-error').should('be.visible').and('contain', 'The password and confirmation password do not match.');
  })

//login
  it('Verify login page accessibility', () => {
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('.page-title').should('contain', 'Welcome, Please Sign In!')
  })

  it('Verify the user can login with valid credentials', () => {
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#Email').type(user.Email);
      cy.get('#Password').type(user.Password);
    })
    cy.get('.login-button').click();
    cy.get('.ico-account').as('myAccount').should('be.visible');
    cy.get('@myAccount').click()
    cy.get('.customer-info-page').should('be.visible').and('contain', 'My account - Customer info');
    cy.title().should('contain', 'nopCommerce demo store. Account')
  })

  it('Verify the user cannot login with blank fields.', () => {
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('.login-button').click();
    cy.get('#Email-error').should('be.visible').and('contain', 'Please enter your email');
    //cy.get('#Password-error').should('be.visible').and('contain','Password is required.');
    cy.get('#Password-error').should('not.exist')
  })

  it('Verify the user cannot log in with invalid credentials.', () => {
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('.login-button').click();
    cy.get('#Email-error').should('be.visible').and('contain', 'Please enter your email');
    //cy.get('#Password-error').should('be.visible').and('contain','Password is required.');
    cy.get('#Password-error').should('not.exist')
  })

  it('Verify the user can log out successfully.', () => {
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#Email').type(user.Email);
      cy.get('#Password').type(user.Password);
    })
    cy.get('.login-button').click();
    cy.get('.ico-logout').as('logout_link').should('be.visible');
    cy.get('@logout_link').click();
    cy.get('.ico-register').should('be.visible');

  })


})