# Credit Card UI

Our simple credit card front-end with a basic RESTful backend.

Our solution uses a REACT front-end that has 2 separate pages, but all the functionality 
resides in the client/src/PaymentPage.js file. On page load, it GETs the payment details. 
Then upon validation of changes, it will push it to the server (POST for new entry, PUT for 
updates). 

## Server API
- GET /api/payment
JSON object { name, number, expiry, cvv }
- POST|PUT /api/payment
Accepts an object with { name, number, expiry, cvv }
- DELETE /api/payment
Clears the payment details for the user.

# Linting Rules
Currently none used, perhaps AirBnb rules?

## Development Mode
Run the server from the root directory:
node server.js

THEN we run the react code separately (from the client directory):
cd client
npm start

Testing client with react jest:
npm test

## Deployment Code & Production Usage
To deploy, we have to build our react code with:
npm run build

After which, everything should run as before; the server has the required capabilties of serving the react code.