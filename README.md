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

## API Documentation

The API documentation is available at:

- `/api-docs` - API documentation
- `/en` - English documentation
- `/et` - Estonian documentation
