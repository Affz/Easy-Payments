# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

## In the client folder run the following commands:


### `npm install`

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## In the server folder run the following command

### `node server.js` 

It will launch the server at port 5000 as default.

## API endpoints

-> '/setup': Post request to add the wallet with name of account holder and balance 

-> '/transact:id' : Put request which will require the walletId to find the wallet and add transactions in your wallet and update the wallet balance and transactions.

-> '/wallet:id': It will find the wallet on the basis of your walletId
