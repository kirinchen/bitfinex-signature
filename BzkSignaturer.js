const Bridge = require('bzk/dist/Bridge').Bridge;
const RpcObj = require('bzk/dist/dtos').RpcObj;
const Uids = require('bzk/dist/dtos').Uids;
const VarQuery = require('bzk/dist/dtos').VarQuery;
const VarQueryPoint = require('bzk/dist/dtos').VarQueryPoint;
const Signaturer = require('./Signaturer');

let bridge = Bridge.getInstance();

async function genSignatureByBridge() {
    const sg = new Signaturer();
    sg.apiKey = await bridge.getVar('bitfinex.key').val;
    sg.apiSecret = await bridge.getVar('bitfinex.secret').val;
    sg.apiPath = await bridge.getVar('apiPath').val;
    sg.body = await bridge.getVar('apiBody').val;
    return sg;
}

async function insertSignatureToVar(){
    const sg = await genSignatureByBridge();
     sg.genSignHeader();
}

module.exports = {
    fromBridge: genSignatureByBridge
};
