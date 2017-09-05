const urlencode = require('urlencode');

function getRandomTime() {
    return Math.floor((Math.random() * 420) + 1680);
}

function enocdeJSON(_json) {
    return urlencode(JSON.stringify(_json));
}

module.exports.getRandomTime = getRandomTime;
module.exports.enocdeJSON = enocdeJSON;