// cypress/support/e2e.js
// Global hooks and custom commands for all E2E tests

// Silence uncaught exceptions from the app that are not test-related
Cypress.on('uncaught:exception', (err) => {
  // Return false to prevent Cypress from failing the test on app errors
  if (err.message.includes('ResizeObserver') || err.message.includes('jQuery')) {
    return false;
  }
});