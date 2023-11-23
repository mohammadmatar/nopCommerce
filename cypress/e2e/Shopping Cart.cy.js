describe('Shopping Cart', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it("verify the user can navigate to the shopping cart", () => {
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.no-data').should('be.visible').and('contain', 'Your Shopping Cart is empty!');

  })

  it("Verify products can be added to the shopping cart (from search result page)", () => {
    const searchquery = 'First Prize Pies';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
  })

  it("Verify products can be added to the shopping cart (from home page)", () => {
    cy.get('.product-box-add-to-cart-button').eq(2).click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
  })

  it("Verify products can be added to the shopping cart (from product details page)", () => {
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
  })

  it('Verify that all added products have at least a quantity, price, total, image, name, sku, and remove option associated with it', () => {
    const searchquery = 'First Prize Pies';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').should('be.visible');
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.sku').should('be.visible')
    cy.get('.product-picture').should('be.visible')
    cy.get('.product').should('be.visible')
    cy.get('.unit-price').should('be.visible')
    cy.get('.quantity').should('be.visible')
    cy.get('.subtotal').should('be.visible')
    cy.get('.remove-from-cart').should('be.visible')
  })

  it('Verify that the user can increase the product quantity from the cart', () => {
    const searchquery = 'First Prize Pies';
    let old_price;
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').should('be.visible');
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.qty-input').invoke('val').should('contain', 1);
    cy.get('.product-subtotal').invoke('text').then((text) => {old_price = text;});
    cy.get('.qty-input').clear();
    cy.get('.qty-input').type(2);
    cy.get('#updatecart').click();
    cy.get('.qty-input').invoke('val').should('contain', 2);
    cy.get('.product-subtotal').invoke('text').then((text) => expect(old_price).to.not.equal(text));
  })

 

  it('Verify that the user can decrease the product quantity from the cart (Product added form product details page)', () => {
    let old_price;
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('#product_enteredQuantity_4').clear()
    cy.get('#product_enteredQuantity_4').type(5)
    cy.get('.add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.qty-input').invoke('val').should('contain', 5);
    cy.get('.product-subtotal').invoke('text').then((text) => {old_price = text;});
    cy.get('.qty-input').clear();
    cy.get('.qty-input').type(2);
    cy.get('#updatecart').click();
    cy.get('.qty-input').invoke('val').should('contain', 2);
    cy.get('.product-subtotal').invoke('text').then((text) => expect(old_price).to.not.equal(text));
  })

  it('Verify that the user can decrease the product quantity from the cart (Product added form search result page)', () => {
    const searchquery = 'First Prize Pies';
    let old_price;
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').should('be.visible');
    cy.get('.product-box-add-to-cart-button').click();
    cy.wait(2000)
    cy.get('.product-box-add-to-cart-button').click();
    cy.wait(1000)
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.qty-input').invoke('val').should('contain', 2);
    cy.get('.product-subtotal').invoke('text').then((text) => {old_price = text;});
    cy.get('.qty-input').clear();
    cy.get('.qty-input').type(1);
    cy.get('#updatecart').click();
    cy.get('.qty-input').invoke('val').should('contain', 1);
    cy.get('.product-subtotal').invoke('text').then((text) => expect(old_price).to.not.equal(text));
  })

  it('Verify products can removed from the cart.', () => {
    const searchquery = 'First Prize Pies';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').should('be.visible');
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.remove-btn').click()
    cy.get('.no-data').should('be.visible').and('contain', 'Your Shopping Cart is empty!');

  })

  it("Verify the cart updates correctly with multiple products.", () => {
    cy.visit('/apple-macbook-pro-13-inch')
    cy.get('.add-to-cart-button').click();
    cy.visit('/first-prize-pies');
    cy.get('.add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain', 'Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
  })


})