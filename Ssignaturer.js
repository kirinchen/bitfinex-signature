const CryptoJS = require('crypto-js') // Standard JavaScript cryptography library
const request = require('request') // "Request" HTTP req library
   
const apiKey = '' // const apiKey = 'paste key here'
const apiSecret = '' // const apiSecret = 'paste secret here'

const apiPath = 'v2/auth/r/wallets'// Example path

const nonce = (Date.now() * 1000).toString() // Standard nonce generator. Timestamp * 1000
const body = {} // Field you may change depending on endpoint

let signature = `/api/${apiPath}${nonce}${JSON.stringify(body)}` 
// Consists of the complete url, nonce, and request body

const sig = CryptoJS.HmacSHA384(signature, apiSecret).toString() 
// The authentication signature is hashed using the private key

const options = {
  url: `https://api.bitfinex.com/${apiPath}`,
  headers: {
    'bfx-nonce': nonce,
    'bfx-apikey': apiKey,
    'bfx-signature': sig
  },
  body: body,
  json: true
}

request.post(options, (error, response, body) => {
  console.log(body); // Logs the response body
})


class Ssignaturer{
    apiKey='';
    apiSecret='';
    apiPath='';
    body={};



}