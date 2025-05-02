/**
 * Test script for logout functionality
 * 
 * This script tests the logout functionality by:
 * 1. Creating a test user
 * 2. Logging in with the test user
 * 3. Testing access to a protected resource
 * 4. Logging out
 * 5. Testing access to the protected resource again (should fail)
 */

const http = require('http');
const https = require('https');

// Configuration
const config = {
  // Change this to true to use the production server
  useProduction: false,
  
  // Local server configuration
  local: {
    hostname: 'localhost',
    port: 3002,
    protocol: 'http:',
  },
  
  // Production server configuration
  production: {
    hostname: 'digikaup.online',
    port: 443,
    protocol: 'https:',
  },
  
  // Test user credentials
  testUser: {
    email: 'test' + Date.now() + '@example.com',
    password: 'password123',
    name: 'Test User',
  },
};

// Get the server configuration based on the useProduction flag
const server = config.useProduction ? config.production : config.local;

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    // Create request options
    const options = {
      hostname: server.hostname,
      port: server.port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Add authorization header if token is provided
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Choose the appropriate protocol (http or https)
    const protocolModule = server.protocol === 'https:' ? https : http;
    
    // Create the request
    const req = protocolModule.request(options, (res) => {
      let responseData = '';
      
      // Collect response data
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      // Resolve the promise when the response is complete
      res.on('end', () => {
        try {
          // Try to parse the response as JSON
          const jsonData = responseData ? JSON.parse(responseData) : null;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: jsonData,
          });
        } catch (error) {
          // If the response is not JSON, return the raw response
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData || null,
          });
        }
      });
    });
    
    // Handle request errors
    req.on('error', (error) => {
      reject(error);
    });
    
    // Send the request data if provided
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    // End the request
    req.end();
  });
}

// Main test function
async function runTest() {
  try {
    console.log('Starting logout functionality test...');
    console.log(`Using ${config.useProduction ? 'PRODUCTION' : 'LOCAL'} server at ${server.protocol}//${server.hostname}:${server.port}`);
    
    // Step 1: Create a test user
    console.log('\n1. Creating test user...');
    const createUserResponse = await makeRequest('POST', '/users', config.testUser);
    
    if (createUserResponse.statusCode !== 201 && createUserResponse.statusCode !== 409) {
      throw new Error(`Failed to create test user: ${JSON.stringify(createUserResponse)}`);
    }
    
    if (createUserResponse.statusCode === 409) {
      console.log('User already exists, continuing with login...');
    } else {
      console.log('Test user created successfully');
    }
    
    // Step 2: Login with the test user
    console.log('\n2. Logging in...');
    const loginResponse = await makeRequest('POST', '/sessions', {
      email: config.testUser.email,
      password: config.testUser.password,
    });
    
    if (loginResponse.statusCode !== 201) {
      throw new Error(`Failed to login: ${JSON.stringify(loginResponse)}`);
    }
    
    const token = loginResponse.data.token;
    console.log('Login successful, received token');
    
    // Step 3: Test access to a protected resource
    console.log('\n3. Testing access to protected resource...');
    const ordersResponse = await makeRequest('GET', '/orders', null, token);
    
    if (ordersResponse.statusCode !== 200) {
      throw new Error(`Failed to access protected resource: ${JSON.stringify(ordersResponse)}`);
    }
    
    console.log('Successfully accessed protected resource');
    
    // Step 4: Logout
    console.log('\n4. Logging out...');
    const logoutResponse = await makeRequest('DELETE', '/sessions', null, token);
    
    if (logoutResponse.statusCode !== 204) {
      throw new Error(`Failed to logout: ${JSON.stringify(logoutResponse)}`);
    }
    
    console.log('Logout successful');
    
    // Step 5: Test access to the protected resource again
    console.log('\n5. Testing access to protected resource after logout...');
    const ordersAfterLogoutResponse = await makeRequest('GET', '/orders', null, token);
    
    if (ordersAfterLogoutResponse.statusCode === 401) {
      console.log('SUCCESS: Could not access protected resource after logout (401 Unauthorized)');
    } else {
      throw new Error(`FAILURE: Could still access protected resource after logout: ${JSON.stringify(ordersAfterLogoutResponse)}`);
    }
    
    console.log('\nAll tests passed! Logout functionality is working correctly.');
    
  } catch (error) {
    console.error('\nTest failed:', error.message);
  }
}

// Run the test
runTest();
