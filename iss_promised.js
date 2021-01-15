const request = require('request-promise-native');

const fetchMyIP = function() {
  // request, when called, returns a promise
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const geoDataObj = JSON.parse(body);
  const coordObj = { latitude: geoDataObj.latitude, longitude: geoDataObj.longitude }
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordObj.latitude}&lon=${coordObj.longitude}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const passes = JSON.parse(body).response;
      return passes;
    });
};

module.exports = { nextISSTimesForMyLocation };