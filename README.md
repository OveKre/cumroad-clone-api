# CumRoad Clone API

A RESTful API for an e-commerce platform.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cumroadclone-api.git
   cd cumroadclone-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file with your configuration.

## Running the API

### Development mode
Before starting the development server, install concurrently:
```
npm install concurrently --save-dev
```

Note: Installing concurrently does not automatically add the script to your package.json file.
Add the following line manually to the scripts section of your backend package.json:
```
"dev": "concurrently \"npm run start\" \"cd frontend && npm run dev\""
```

Then start the development server:
```
npm run dev
```

If you want to run the backend and frontend separately, first navigate to the frontend folder:
```
cd frontend
```
and start the frontend:
```
npm run dev
```
You can start the backend from the project root folder:
```
npm run start
```

### Production mode
```
npm start
```

The API will be available at `http://localhost:3002` by default.

## Testing

This project includes comprehensive testing documentation and test suites:

### Test Documentation
- **Test Plan:** `tests/manual/testplan.md` - Complete 19-section test plan
- **Test Cases:** `tests/manual/testcases/` - 25+ detailed test cases
- **Test Reports:** `reports/` - Test run reports and artifacts

### Running Tests

#### Manual Testing
Follow the test cases in `tests/manual/testcases/` directory.

#### Automated Testing
```bash
# Install test dependencies
cd tests/automation
npm install

# Install browsers for E2E testing (requires internet connection)
npm run install-browsers

# If browser installation fails due to network issues, you can:
# 1. Use system browsers: npm run test -- --browser-path="C:\Program Files\Google\Chrome\Application\chrome.exe"
# 2. Skip E2E tests and run only unit tests: npm run test:unit
# 3. Try alternative installation: npx playwright install --with-deps chromium

# Run all tests (Playwright automatically starts frontend + backend)
npm test

# Run tests with UI (requires browsers installed)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run only unit tests (no browser or running app required)
npm run test:unit

# Manual approach: Start app first, then test
# Terminal 1: npm start
# Terminal 2: cd frontend && npm run dev  
# Terminal 3: cd tests/automation && npm test
```

#### CI/CD Testing
Tests are automatically run via GitHub Actions on push and pull requests.

### Test Coverage
- Backend: 80%+ line coverage target
- Frontend: 80%+ line coverage target
- E2E: Critical user journeys covered

## API Documentation

The API documentation is available at:

- `/api-docs` - API documentation
- `/en` - English documentation
- `/et` - Estonian documentation
