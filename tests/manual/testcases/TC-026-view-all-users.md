# TC-026: User Management - View All Users

## Test Information
- **Test ID**: TC-026
- **Test Type**: Functional Test
- **Priority**: High
- **Author**: Test Engineer
- **Date Created**: 2025-08-25

## Test Objective
Verify that authenticated users can view a list of all users in the system using the GET /users endpoint.

## Preconditions
- Backend server is running
- Frontend application is accessible
- User is logged in with valid credentials
- At least one user exists in the system

## Test Steps

### Step 1: Navigate to User Management
1. Log in to the application
2. Click on "Users" in the navigation menu
3. Verify user is redirected to `/users`

**Expected Result**: User Management page loads successfully

### Step 2: Verify User List Display
1. Observe the user list table
2. Check that users are displayed with following information:
   - User name and email
   - User role (admin/user)
   - Creation date
   - Action buttons (View, Edit, Delete)

**Expected Result**: All users are displayed in a table format

### Step 3: Test Search Functionality
1. Enter search term in the search box
2. Verify results are filtered by name or email

**Expected Result**: Search filters users correctly

### Step 4: Verify Statistics
1. Check the statistics section at bottom
2. Verify counts for:
   - Total Users
   - Regular Users
   - Administrators

**Expected Result**: Statistics display correct counts

## Test Data
- Test user: user@example.com / password
- Admin user: admin@example.com / adminpass

## Expected Results
- User Management page loads without errors
- All users are displayed in table
- Search functionality works correctly
- User statistics are accurate
- GET /users API endpoint is called successfully

## Pass/Fail Criteria
- **Pass**: All steps complete successfully and user list is displayed
- **Fail**: Page doesn't load, users not displayed, or API call fails

## Notes
- This test validates the GET /users endpoint functionality
- Requires authentication to access
- Tests both UI and API integration
