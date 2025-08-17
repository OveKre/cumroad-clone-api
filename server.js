/**
 * CumRoad Clone API - Server Entry Point
 */

// Load environment variables
require('dotenv').config();

// Import dependencies
const app = require('./app');

// Get port from environment variables or use default
const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at:`);
  console.log(`- http://localhost:${PORT}/api-docs (Local - English)`);
  console.log(`- http://localhost:${PORT}/en (Local - English)`);
  console.log(`- http://localhost:${PORT}/et (Local - Estonian)`);
  console.log(`- https://digikaup.online/api-docs (Production - English)`);
  console.log(`- https://docs.digikaup.online/en (Production - English)`);
  console.log(`- https://docs.digikaup.online/et (Production - Estonian)`);
});
