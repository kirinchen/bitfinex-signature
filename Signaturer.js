const CryptoJS = require('crypto-js') // Standard JavaScript cryptography library


class Signaturer {
  apiKey = '';
  apiSecret = '';
  apiPath = '';
  bodyJSON = '';
  nonce = '';


  getApiUrl(){
    return `https://api.bitfinex.com/${this.apiPath}`
  }

  genNonce() {
    this.nonce = (Date.now() * 1000).toString();
    return this.nonce;
  }

  genPlain() {
    return `/api/${this.apiPath}${this.genNonce()}${this.bodyJSON}`
  }

  genSignature() {
    return CryptoJS.HmacSHA384(this.genPlain(), this.apiSecret).toString();
  }

  genSignHeader() {
    const sig = this.genSignature();
    return {
      'bfx-nonce': this.nonce,
      'bfx-apikey': this.apiKey,
      'bfx-signature': sig
    };
  }

}

module.exports = Signaturer;