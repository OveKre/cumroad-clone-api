// E2E Test for Authentication Flow
// Covers TC-001, TC-002, TC-003, TC-004

const { test, expect } = require('@playwright/test');
const { auth, assertions } = require('../helpers/testHelpers');

test.describe('Authentication Flow', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure we start with a clean state
    await page.goto('/');
    // Clear any existing auth state
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('TC-001: Successful login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill in credentials
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'password');
    
    // Submit form
    await page.click('[data-testid="login-button"]');
    
    // Verify successful login
    await assertions.expectSuccessfulLogin(page);
    
    // Verify token is stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('TC-002: Failed login with invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Listen to all network requests
    const responses = [];
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
      });
    });
    
    // Fill in invalid credentials
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('[data-testid="login-button"]');
    
    // Wait a bit for the response
    await page.waitForTimeout(2000);
    
    console.log('Network responses:', responses);
    
    // Check if error element exists at all
    const errorElement = await page.locator('[data-testid="error-message"]');
    const isErrorVisible = await errorElement.isVisible();
    console.log('Error element visible:', isErrorVisible);
    
    // Check page content
    const pageContent = await page.textContent('body');
    console.log('Page contains "invalid":', pageContent.includes('invalid'));
    console.log('Page contains "error":', pageContent.includes('error'));
    
    // Verify error message
    await assertions.expectErrorMessage(page, 'The provided credentials are invalid');
    
    // Verify we stay on login page
    await expect(page).toHaveURL('/login');
    
    // Verify no token is stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
  });

  test('TC-003: Successful user registration', async ({ page }) => {
    const testUser = {
      name: 'Test User',
      email: `testuser${Date.now()}@example.com`,
      password: 'SecurePass123!'
    };

    // Listen to console messages
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    // Listen to page errors
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    // Listen to network responses
    const responses = [];
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
      });
    });

    await auth.register(page, testUser);
    
    console.log('Network responses:', responses.filter(r => r.url.includes('localhost:3002')));
    
    // Verify automatic login after registration
    await assertions.expectSuccessfulLogin(page);
    
    // Verify user info is available
    const userInfo = await page.evaluate(() => localStorage.getItem('user'));
    expect(userInfo).toBeTruthy();
  });

  test('TC-004: Successful logout', async ({ page }) => {
    // First login
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // Then logout
    await auth.logout(page);
    
    // Verify logout
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="login-link"]')).toBeVisible();
    
    // Verify token is removed
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeFalsy();
  });

  test('Protected route access without authentication', async ({ page }) => {
    // Try to access protected route without login
    await page.goto('/dashboard');
    
    // Should be redirected to login
    await expect(page).toHaveURL('/login');
  });

  test('Token expiry handling', async ({ page }) => {
    // This test would require backend configuration for short token expiry
    // Skip for now unless test environment is configured
    test.skip(true, 'Requires backend configuration for short token expiry');
  });
});

test.describe('Authentication Security Tests', () => {
  
  test('SQL Injection protection in login form', async ({ page }) => {
    await page.goto('/login');
    
    // Try SQL injection
    await page.fill('[data-testid="email"]', "admin'; DROP TABLE users; --");
    await page.fill('[data-testid="password"]', 'anything');
    
    await page.click('[data-testid="login-button"]');
    
    // Should show invalid credentials error, not crash
    await assertions.expectErrorMessage(page, 'The provided credentials are invalid');
  });

  test('XSS protection in registration form', async ({ page }) => {
    await page.goto('/register');
    
    const xssPayload = '<script>alert("XSS")</script>';
    
    await page.fill('[data-testid="name"]', xssPayload);
    await page.fill('[data-testid="email"]', 'test@example.com');
    await page.fill('[data-testid="password"]', 'Pass123!');
    
    await page.click('[data-testid="register-button"]');
    
    // Verify XSS payload doesn't execute
    const alerts = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    // Wait a bit to see if any alerts fire
    await page.waitForTimeout(1000);
    expect(alerts).toHaveLength(0);
  });
});
