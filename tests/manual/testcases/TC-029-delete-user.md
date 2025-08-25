# TC-029: User Management - Delete User

## Test Information
- **Test ID**: TC-029
- **Test Type**: Functional Test
- **Priority**: High
- **Author**: Test Engineer
- **Date Created**: 2025-08-25

## Test Objective
Verify that authenticated users can delete other users using the DELETE /users/{id} endpoint.

## Preconditions
- Backend server is running
- Frontend application is accessible
- User is logged in with valid credentials
- Target user exists in the system (not current user)

## Test Steps

### Step 1: Delete User from User List
1. Go to User Management page (`/users`)
2. Find a user row (not current user)
3. Click the delete (trash) icon
4. Confirm deletion in the confirmation dialog

**Expected Result**: 
- Confirmation dialog appears
- User is removed from the list
- Success message is displayed

### Step 2: Delete User from Detail Page
1. Go to User Detail page (`/users/{id}`)
2. Click "Delete User" button
3. Confirm deletion in the confirmation dialog

**Expected Result**: 
- Confirmation dialog appears
- User is deleted
- Redirected to users list
- Success message is displayed

### Step 3: Test Current User Protection
1. Navigate to current user's detail page
2. Verify "Delete User" button is not present

**Expected Result**: Current user cannot delete themselves

### Step 4: Test Deletion Confirmation
1. Click delete button for any user
2. Click "Cancel" in confirmation dialog
3. Verify user is not deleted

**Expected Result**: Deletion is cancelled, user remains

### Step 5: Verify API Call
1. Monitor network requests during deletion
2. Verify DELETE /users/{id} is called
3. Check response status is 200/204

**Expected Result**: Correct API call is made and succeeds

## Test Data
- Test user to delete: Create a temporary user for deletion
- Current user: user@example.com (should not be deletable by self)

## Expected Results
- Users can be deleted from both list and detail views
- Confirmation dialog prevents accidental deletion
- Current user cannot delete themselves
- DELETE /users/{id} API endpoint is called successfully
- UI is updated after successful deletion
- Success messages are displayed

## Pass/Fail Criteria
- **Pass**: User deletion works correctly with proper safeguards
- **Fail**: Deletion fails, no confirmation, or users can delete themselves

## Notes
- This test validates the DELETE /users/{id} endpoint functionality
- Tests safety measures (confirmation, self-deletion prevention)
- Verifies proper UI updates after deletion
