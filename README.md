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
Enne arendusserveri käivitamist paigalda concurrently:
```
npm install concurrently --save-dev
```

NB! Kui paigaldad concurrently, siis package.json faili skriptid ei muutu automaatselt.
Lisa ise backend package.json faili scripts sektsiooni näiteks selline rida:
```
"dev": "concurrently \"npm run start\" \"cd frontend && npm run dev\""
```

Seejärel käivita arendusserver:
```
npm run dev
```

Kui soovid käivitada backend ja frontend eraldi, liigu esmalt frontend kausta:
```
cd frontend
```
ja käivita frontend:
```
npm run dev
```
Backendi saad käivitada projekti juurkaustas:
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
