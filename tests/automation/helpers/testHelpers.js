// E2E Test Helper Functions
// This file contains utility functions for E2E testing

const { expect } = require('@playwright/test');

/**
 * Authentication helpers
 */
export const auth = {
  async login(page, email = 'user@example.com', password = 'password') {
    await page.goto('/login');
    await page.fill('[data-testid="email"]', email);
    await page.fill('[data-testid="password"]', password);
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
  },

  async logout(page) {
    await page.click('[data-testid="logout-button"]');
    await page.waitForURL('/');
  },

  async register(page, userData) {
    await page.goto('/register');
    
    // Listen to network responses
    const responses = [];
    page.on('response', response => {
      if (response.url().includes('localhost:3002')) {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });
    
    await page.fill('[data-testid="name"]', userData.name || 'Test User');
    await page.fill('[data-testid="email"]', userData.email);
    await page.fill('[data-testid="password"]', userData.password);
    await page.fill('[data-testid="confirmPassword"]', userData.password);
    
    console.log('Clicking register button...');
    await page.click('[data-testid="register-button"]');
    
    console.log('Waiting for backend responses...');
    
    // Wait for both API calls to complete
    await page.waitForFunction(() => {
      return window.location.pathname === '/dashboard';
    }, { timeout: 10000 });
    
    console.log('Backend responses:', responses);
    console.log('Successfully redirected to dashboard');
    
    // Since we're now on dashboard, registration was successful
    // No need to check for success message as user is already redirected
  }
};

/**
 * Product management helpers
 */
export const products = {
  async createProduct(page, productData) {
    await page.goto('/products/new');
    await page.fill('[data-testid="product-name"]', productData.name);
    await page.fill('[data-testid="product-description"]', productData.description || '');
    await page.fill('[data-testid="product-price"]', productData.price.toString());
    if (productData.imageUrl) {
      await page.fill('[data-testid="product-image"]', productData.imageUrl);
    }
    await page.click('[data-testid="create-product-button"]');
    await page.waitForURL(/\/products\/\d+/);
  },

  async deleteProduct(page, productId) {
    await page.goto(`/products/${productId}`);
    await page.click('[data-testid="delete-product-button"]');
    await page.click('[data-testid="confirm-delete"]');
    await page.waitForURL('/products');
  }
};

/**
 * API testing helpers
 */
export const api = {
  async makeRequest(method, endpoint, data = null, token = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`http://localhost:3002${endpoint}`, options);
    return response;
  },

  async getAuthToken(email, password) {
    const response = await this.makeRequest('POST', '/sessions', {
      email,
      password
    });
    const data = await response.json();
    return data.token;
  }
};

/**
 * Database helpers
 */
export const database = {
  async cleanupTestData() {
    // Clean up test data after tests
    // This would connect to test database and remove test records
    console.log('Cleaning up test data...');
  },

  async seedTestData() {
    // Seed database with test data
    console.log('Seeding test data...');
  }
};

/**
 * Assertion helpers
 */
export const assertions = {
  async expectSuccessfulLogin(page) {
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
  },

  async expectErrorMessage(page, message) {
    // Wait a bit for API response
    await page.waitForTimeout(1000);
    
    // Debug: check if any error message exists
    const errorElement = page.locator('[data-testid="error-message"]');
    const isVisible = await errorElement.isVisible().catch(() => false);
    console.log('Error message visible:', isVisible);
    
    if (isVisible) {
      const actualText = await errorElement.textContent();
      console.log('Actual error text:', actualText);
    }
    
    // Check page content for debugging
    const pageContent = await page.content();
    console.log('Page contains error:', pageContent.includes('error'));
    
    await expect(page.locator('[data-testid="error-message"]')).toContainText(message);
  },

  async expectProductCreated(page, productName) {
    await expect(page.locator('h1')).toContainText(productName);
    await expect(page).toHaveURL(/\/products\/\d+/);
  }
};

/**
 * Performance testing helpers
 */
export const performance = {
  async measureApiResponseTime(endpoint, method = 'GET') {
    const start = performance.now();
    await api.makeRequest(method, endpoint);
    const end = performance.now();
    return end - start;
  },

  async measurePageLoadTime(page, url) {
    const start = performance.now();
    await page.goto(url);
    await page.waitForLoadState('networkidle');
    const end = performance.now();
    return end - start;
  }
};
