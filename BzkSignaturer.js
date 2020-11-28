const Bridge = require('bzk/dist/Bridge').Bridge;
const Signaturer = require('./Signaturer');

let bridge = Bridge.getInstance();

function genSignatureByBridge() {
    const sg = new Signaturer();
    sg.apiKey =  bridge.get('bitfinex.key');
    sg.apiSecret =  bridge.get('bitfinex.secret');
    sg.apiPath =  bridge.get('apiPath');
    sg.body =  bridge.get('apiBody');
    return sg;
}

async function insertSignatureToVar(headerKey,urlKey) {
    const sg = genSignatureByBridge();
    const h = sg.genSignHeader();
    bridge.set(headerKey,h);
    bridge.set(urlKey,sg.getApiUrl());
}

module.exports = {
    fromBridge: genSignatureByBridge,
    insertSignatureToVar:insertSignatureToVar
};
