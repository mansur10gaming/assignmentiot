const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL – Cypress prepends this to cy.visit() calls
    baseUrl: 'http://localhost:3000',

    // Where Cypress looks for spec files
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    // Support file (optional helpers, commands)
    supportFile: 'cypress/support/e2e.js',

    // Screenshots & videos
    screenshotsFolder: 'cypress/screenshots',
    videosFolder:      'cypress/videos',
    video:             true,
    screenshotOnRunFailure: true,

    // Timeouts (ms)
    defaultCommandTimeout: 8000,
    requestTimeout:        10000,
    responseTimeout:       10000,
    pageLoadTimeout:       30000,

    // Viewport
    viewportWidth:  1280,
    viewportHeight: 800,

    // Open mode uses Electron by default; no extra flag needed.
    // Run: npx cypress open          → interactive Electron window
    // Run: npx cypress run           → headless
    // Run: npx cypress run --browser chrome  → headed Chrome

    setupNodeEvents(on, config) {
      // place plugins here if needed
      return config;
    },
  },
});