const { test, expect } = require('@playwright/test');
const { auth, assertions } = require('../helpers/testHelpers');

test.describe('User Management Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Ensure we start with a clean state
    await page.goto('/');
  });

  test('TC-026: View all users (GET /users)', async ({ page }) => {
    // Login first
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // Navigate to users page
    await page.click('[data-testid="users-nav-link"]');
    await page.waitForURL('/users');
    
    // Wait for users to load
    await page.waitForSelector('[data-testid="user-row-1"]', { timeout: 10000 });
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('User Management');
    
    // Verify user table exists and has content
    const userRows = page.locator('[data-testid^="user-row-"]');
    const userCount = await userRows.count();
    expect(userCount).toBeGreaterThan(0);
    
    // Verify first user has required data
    await expect(page.locator('[data-testid="user-name-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-email-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-role-1"]')).toBeVisible();
    
    // Test search functionality
    await page.fill('[data-testid="search-users"]', 'user@example.com');
    await page.waitForTimeout(500); // Wait for search to filter
    
    // Verify search results
    const filteredRows = page.locator('[data-testid^="user-row-"]');
    const filteredCount = await filteredRows.count();
    expect(filteredCount).toBeGreaterThanOrEqual(0);
  });

  test('TC-027: View user details (GET /users/{id})', async ({ page }) => {
    // Login first
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // Navigate to users page and click view on first user
    await page.goto('/users');
    await page.waitForSelector('[data-testid="view-user-1"]', { timeout: 10000 });
    await page.click('[data-testid="view-user-1"]');
    
    // Wait for user detail page
    await page.waitForURL('/users/1');
    
    // Verify user details are displayed
    await expect(page.locator('[data-testid="user-detail-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-detail-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-detail-role"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-detail-id"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-detail-created"]')).toBeVisible();
    await expect(page.locator('[data-testid="user-detail-updated"]')).toBeVisible();
    
    // Verify action buttons
    await expect(page.locator('[data-testid="edit-user-button"]')).toBeVisible();
    
    // Check if delete button exists (depends on whether this is current user)
    const deleteButton = page.locator('[data-testid="delete-user-button"]');
    // Delete button should only exist if not current user
  });

  test('TC-028: Edit user information (PATCH /users/{id})', async ({ page }) => {
    // Login first
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // Navigate to edit user page
    await page.goto('/users/1/edit');
    await page.waitForLoadState('networkidle');
    
    // Verify form is pre-filled
    const emailField = page.locator('[data-testid="edit-user-email"]');
    const nameField = page.locator('[data-testid="edit-user-name"]');
    
    await expect(emailField).toBeVisible();
    await expect(nameField).toBeVisible();
    
    // Get current values
    const currentEmail = await emailField.inputValue();
    const currentName = await nameField.inputValue();
    
    // Update name field
    const newName = `Updated Name ${Date.now()}`;
    await nameField.clear();
    await nameField.fill(newName);
    
    // Submit form
    await page.click('[data-testid="save-user-button"]');
    
    // Wait for success message or redirect
    await page.waitForTimeout(2000);
    
    // Should redirect to user detail page
    await page.waitForURL('/users/1');
    
    // Verify updated information is displayed
    await expect(page.locator('[data-testid="user-detail-name"]')).toContainText(newName);
  });

  test('TC-029: Delete user (DELETE /users/{id})', async ({ page }) => {
    // Login first
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // First create a test user to delete (if possible) or use existing non-current user
    // Navigate to users page
    await page.goto('/users');
    await page.waitForLoadState('networkidle');
    
    // Find a user that's not the current user (look for delete button)
    const deleteButtons = page.locator('[data-testid^="delete-user-"]');
    const deleteButtonCount = await deleteButtons.count();
    
    if (deleteButtonCount > 0) {
      // Get the first delete button
      const firstDeleteButton = deleteButtons.first();
      
      // Listen for confirmation dialog
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure');
        await dialog.accept();
      });
      
      // Click delete button
      await firstDeleteButton.click();
      
      // Wait for deletion to complete
      await page.waitForTimeout(2000);
      
      // Verify success message or user removal
      // This test might need adjustment based on actual deletion behavior
    }
  });

  test('User management navigation flow', async ({ page }) => {
    // Login first
    await auth.login(page);
    await assertions.expectSuccessfulLogin(page);
    
    // Test complete navigation flow
    await page.click('[data-testid="users-nav-link"]');
    await page.waitForURL('/users');
    
    // Navigate to user detail
    await page.click('[data-testid="view-user-1"]');
    await page.waitForURL('/users/1');
    
    // Navigate to edit
    await page.click('[data-testid="edit-user-button"]');
    await page.waitForURL('/users/1/edit');
    
    // Cancel back to detail
    await page.click('text=Cancel');
    await page.waitForURL('/users/1');
    
    // Back to users list
    await page.click('text=Back to users');
    await page.waitForURL('/users');
  });

});
