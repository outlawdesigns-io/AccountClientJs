# AccountClientJS

## Preamble
This module provides an interface for clients to authenticate against our [AccountService](https://github.com/outlawdesigns-io/AccountService) to make authenticated requests to our systems.

## Installation

`npm i outlawdesigns.io.accountclient`

## Usage

```
const client = require('outlawdesigns.io.accountclient');
const config = require('./config');

(async ()=>{
  await client.authenticate(config.username,config.passsword);
  /*
    Your authorization token is now stored in client.authToken.
    Use it in your code to make privileged requests.
  */
})();

```
