describe('Checkout', () => {

  beforeEach(() => {
    cy.fixture('InformationData').as("InformationData")
    cy.visit('/')
  })

  it("verify the unregistered user can navigate to the checkout page", () => {
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.get('#termsofservice').click()
    cy.get('#checkout').click()
    cy.get('.page-title').should('be.visible').and('contain', 'Welcome, Please Sign In!');
    cy.get('.checkout-as-guest-button').click()
    cy.get('.page-title').should('be.visible').and('contain', 'Checkout');

  })

  it("verify the registered user can navigate to the checkout page", () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let RandomEmail;
    // register
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#FirstName').type(user.Fname);
      cy.get('#LastName').type(user.Lname);
      RandomEmail = "test"+randomNumber+''+user.Email;
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
      cy.get('#ConfirmPassword').type(user.Password);
    })
    cy.wait(2000)
    cy.get('#register-button').click();
    cy.get('.register-continue-button').click();
    // Log in
    cy.wait(2000)
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
    })
    cy.get('.login-button').click();
    // Navigate to the product page and add to cart
    cy.wait(2000)
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    // Go to the shopping cart
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.get('#termsofservice').click()
    // Go to the shopping cart
    cy.get('#checkout').click()
    cy.get('.page-title').should('be.visible').and('contain', 'Checkout');
  })

  it("verify the user cannot navigate to the checkout page without accept the terms of service", () => {
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.get('#checkout').click()
    cy.get('#terms-of-service-warning-box').should('be.visible').and('contain', 'Please accept the terms of service before the next step.');
  })

  it("Verify the checkout process works correctly with valid payment information (Check / Money Order)", () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let RandomEmail;
    cy.fixture('CreditCardData').as("CreditCardData")
    // register
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#FirstName').type(user.Fname);
      cy.get('#LastName').type(user.Lname);
      RandomEmail = "test"+randomNumber+''+user.Email;
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
      cy.get('#ConfirmPassword').type(user.Password);
    })
    cy.wait(2000)
    cy.get('#register-button').click();
    cy.get('.register-continue-button').click();
    // Log in
    cy.wait(2000)
    cy.clearAllSessionStorage()
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
    })
    cy.get('.login-button').click();
    // Navigate to the product page and add to cart
    cy.wait(2000)
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    cy.wait(2000)
    // Go to the shopping cart
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.get('#termsofservice').click()
    // Go to the shopping cart
    cy.get('#checkout').click()
    cy.get('.page-title').should('be.visible').and('contain', 'Checkout');
    // Fill Billing Address and shipping address
    //The following were filled out during registration.
    // cy.get('#BillingNewAddress_FirstName').type('test');
    // cy.get('#BillingNewAddress_LastName').type('test');
    // cy.get('#BillingNewAddress_Email').type(Emailvariable);
    cy.get('#BillingNewAddress_CountryId').select('Jordan').should('have.value', '140');
    cy.get('#BillingNewAddress_City').type('Amman');
    cy.get('#BillingNewAddress_Address1').type('Amman');
    cy.get('#BillingNewAddress_ZipPostalCode').type(11123);
    cy.get('#BillingNewAddress_PhoneNumber').type(+962787878787);
    cy.get('#billing-buttons-container > .new-address-next-step-button').click({ force: true });
    // Select Shipping method
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Shipping method');
    cy.get('#shipping-method-buttons-container > .shipping-method-next-step-button').click({ force: true });
    // Select Payment method
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Payment method');
    cy.get('.payment-method-next-step-button').click({ force: true });
    // Check Payment information
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Payment information');
    cy.get('.payment-info-next-step-button').click({ force: true });
    // Confirm order
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Confirm order');
    cy.get('.confirm-order-next-step-button').click({ force: true })
    // completed page
    cy.wait(2000)
    cy.get('.order-completed-page > .page-title').should('be.visible').and('contain', 'Thank you');
    cy.url().should('include', 'completed')
    cy.get('.title').should('be.visible').and('contain', 'Your order has been successfully processed!');

  })


  it("Verify the checkout process works correctly with valid payment information (Credit Card)", () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let RandomEmail;
    cy.viewport(port)
    cy.fixture('CreditCardData').as("CreditCardData")
    // register
    cy.get('.ico-register').as('register_link');
    cy.get('@register_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#FirstName').type(user.Fname);
      cy.get('#LastName').type(user.Lname);
      RandomEmail = "test"+randomNumber+''+user.Email;
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
      cy.get('#ConfirmPassword').type(user.Password);
    })
    cy.get('#register-button').click();
    cy.get('.register-continue-button').click();
    // Log in
    cy.wait(2000)
    cy.clearAllSessionStorage()
    cy.get('.ico-login').as('login_link');
    cy.get('@login_link').click();
    cy.get('@InformationData').then((user) => {
      cy.get('#Email').type(RandomEmail);
      cy.get('#Password').type(user.Password);
    })
    cy.get('.login-button').click();
    // Navigate to the product page and add to cart
    cy.wait(2000)
    const searchquery = 'First Prize Pies';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.wait(2000)
    // Go to the shopping cart
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
    cy.get('#termsofservice').click()
    // Go to the shopping cart
    cy.get('#checkout').click()
    cy.get('.page-title').should('be.visible').and('contain', 'Checkout');
    // Fill Billing Address and shipping address
    //The following were filled out during registration.
    // cy.get('#BillingNewAddress_FirstName').type('test');
    // cy.get('#BillingNewAddress_LastName').type('test');
    // cy.get('#BillingNewAddress_Email').type(Emailvariable);
    cy.get('@InformationData').then((user) => {
      cy.get('#BillingNewAddress_CountryId').select(user.Country).should('have.value', '140');
      cy.get('#BillingNewAddress_City').type(user.City);
      cy.get('#BillingNewAddress_Address1').type(user.City);
      cy.get('#BillingNewAddress_ZipPostalCode').type(user.ZipPostalCode);
      cy.get('#BillingNewAddress_PhoneNumber').type(user.PhoneNumber);
    })

    cy.get('#billing-buttons-container > .new-address-next-step-button').click({ force: true });
    // Select Shipping method
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Shipping method');
    cy.get('#shipping-method-buttons-container > .shipping-method-next-step-button').click({ force: true });
    // Select Payment method
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Payment method');
    cy.get('#paymentmethod_1').check('Payments.Manual');

    cy.get('.payment-method-next-step-button').click({ force: true });
    // Check Payment information
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Payment information');
    cy.get('@CreditCardData').then((credit) => {
      cy.get('#CreditCardType').select(credit.CreditCardType).should('have.value', credit.CreditCardType);
      cy.get('#CardholderName').type(credit.CardholderName);
      cy.get('#CardNumber').type(credit.CardNumber);
      cy.get('#ExpireMonth').select(0 + '' + credit.ExpireMonth).should('have.value', credit.ExpireMonth);
      cy.get('#ExpireYear').select(credit.ExpireYear).should('have.value', credit.ExpireYear);
      cy.get('#CardCode').type(credit.CardCode);
    })

    cy.get('.payment-info-next-step-button').click({ force: true });
    // Confirm order
    cy.wait(2000)
    cy.get('.step-title').should('be.visible').and('contain', 'Confirm order');
    cy.get('.confirm-order-next-step-button').click({ force: true })
    // completed page
    cy.wait(2000)
    cy.get('.order-completed-page > .page-title').should('be.visible').and('contain', 'Thank you');
    cy.url().should('include', 'completed')
    cy.get('.title').should('be.visible').and('contain', 'Your order has been successfully processed!');
  })
})