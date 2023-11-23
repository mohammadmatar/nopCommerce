describe('Product Search and Filter', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it("Verify that the search bar is prominently displayed on the website's header", () => {
    cy.get('#small-search-box-form').should('be.visible')
  })

  it("Verify Enter an empty search query", () => {
    cy.get('.search-box-button').click()
    const stub = cy.stub()
    cy.on('window:alert', stub).then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Please enter some search keyword')
    })
  })

  it('Verify the search functionality returns accurate results.', () => {
    const searchquery = 'Apple';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('#q').should('be.visible');
    cy.get('#q').invoke('val').should('contain', searchquery);
    cy.get('.search-results').should('be.visible');
    cy.get('.product-item').should('be.visible');
    cy.get('.product-title').first('a').invoke('text').should('contain', searchquery);
  })

  it('Verify the search results show product images, names, prices, rates, and actions buttons', () => {
    const searchquery = 'Samsung Series 9 NP900X4C Premium Ultrabook';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-item').should('be.visible');
    cy.get('.product-title').first('a').invoke('text').should('contain', searchquery);
    cy.get('.picture > a > img').should('be.visible');
    cy.get('.rating').should('be.visible');
    cy.get('.prices').should('be.visible');
    cy.get('.buttons').should('be.visible');

  })

  it('Verify multi-word queries with spaces return accurate result.', () => {
    const searchquery = 'Samsung Series 9 NP900X4C Premium Ultrabook';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('#q').should('be.visible');
    cy.get('#q').invoke('val').should('contain', searchquery);
    cy.get('.search-results').should('be.visible');
    cy.get('.product-item').should('be.visible');
    cy.get('.product-title').first('a').invoke('text').should('contain', searchquery);
  })

  it('Verify the "Search As You Type" feature for real-time suggestions.', () => {
    const searchquery = 'App';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('#ui-id-2').should('be.visible')
    cy.get('#ui-id-2').first().click()
    cy.title().should('contain', 'Apple MacBook Pro 13-inch')
    cy.get('.product-name').should('contain', "Apple MacBook Pro 13-inch");
  })

  it('Verify filters work correctly and are applied to search results.', () => {
     cy.get('.header-menu > .notmobile').should('be.visible');
     cy.get('.notmobile > li').first().click();
     cy.get('.page-title').should('be.visible').and('contain', 'Computers');
    cy.get('.block-category-navigation > .listbox > .list > .active > .sublist').contains('a', 'Notebook').click();
    cy.get('.page-title').should('be.visible').and('contain', 'Notebook');
     cy.get('#attribute-option-6').click();
     cy.get('.block-manufacturer-navigation > .listbox > .list > .inactive').contains('a', 'HP').click();
     cy.get('.page-title').should('be.visible').and('contain', 'HP');
    
  })


  it('Verify the combination of search and filters returns accurate results.', () => {
    const searchquery = 'Apple';
    const newsearchquery = 'Obey Propaganda Hat';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('#q').should('be.visible');
    cy.get('#q').invoke('val').should('contain', searchquery);
    cy.get('#q').clear();
    cy.get('#q').type(newsearchquery);
    cy.get('#advs').click();
    cy.get('#cid').select('Apparel').should('have.value', '9');
    cy.get('#isc').click();
    cy.get('.search-button').click();
    cy.get('.search-results').should('be.visible');
    cy.get('.product-item').should('be.visible');
    cy.get('.product-title').first('a').invoke('text').should('contain', newsearchquery);
  })

  it('Verify Search Term Minimum Length', () => {
    const searchquery = 'Ap';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.warning').invoke('text').then((text) => expect('Search term minimum length is 3 characters').eql(text));
    
  })

  it.only('Verify the search for a product that does not exist', () => {
    const searchquery = 'Aps';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.no-result').invoke('text').then((text) => expect('No products were found that matched your criteria.').eql(text));
    
  })

  it('Verify Number of Results to be Displayed Per Page (Pagination)', () => {
    const searchquery = 'Book';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.search-results').should('be.visible');
    cy.get('.pager').should('be.visible');
    cy.get('.next-page').click()
    cy.url().should('include', 'pagenumber=2')
  })

  it('verify that a product displayed in the search result can be easily added to the shopping cart.', () => {
    const searchquery = 'First Prize Pies';
    cy.get('#small-search-box-form').type(searchquery);
    cy.get('.search-box-button').click();
    cy.get('.product-box-add-to-cart-button').should('be.visible');
    cy.get('.product-box-add-to-cart-button').click();
    cy.get('#topcartlink').click();
    cy.get('.shopping-cart-page').should('be.visible').and('contain','Shopping cart');
    cy.get('.table-wrapper').should('be.visible')
  })
  
})