const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ims98o',
 /// <reference types="Cypress" /> 
  e2e: {
    viewportHeight: 1080,
    viewportWidth:1920,
    baseUrl: "https://demo.nopcommerce.com/",
    experimentalRunAllSpecs: true,
    experimentalstudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
