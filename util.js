function getRandomTime() {
    //  return Math.floor((Math.random() * 420) + 1680);
    return 360;
}

function enocdeJSON(_json) {
    return urlencode(JSON.stringify(_json));
}

module.exports.getRandomTime = getRandomTime;
module.exports.enocdeJSON = enocdeJSON;