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

async function insertSignatureToVar() {
    const sg = await genSignatureByBridge();
    const h = sg.genSignHeader();
    const rhlv = await bridge.getVar('rhlv').val;
    const rhkey = await bridge.getVar('rhkey').val;
    bridge.markVar({
        lv: rlv,
        key: rkey,
        val: h
    });
    const rulv = await bridge.getVar('rulv').val;
    const rukey = await bridge.getVar('rukey').val;
    bridge.markVar({
        lv: rulv,
        key: rukey,
        val: sg.getApiUrl()
    });
}

module.exports = {
    fromBridge: genSignatureByBridge,
    insertSignatureToVar:insertSignatureToVar
};
