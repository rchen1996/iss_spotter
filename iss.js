/**
 * Makes a single API request to retrieve the user's IP address
 * Input:
 *    - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *    - An error, if any (nullable)
 *    - The IP address as a string (null if error)
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipObj = JSON.parse(body);
    const ip = ipObj.ip;
    callback(error, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const message = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(message));
      return;
    }
    const geoObj = JSON.parse(body);
    const coordinatesObj = { latitude: geoObj.latitude, longitude: geoObj.longitude };
    callback(error, coordinatesObj);
  });
};

const fetchISSFlyOverTimes = function(coordinatesObj, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinatesObj.latitude}&lon=${coordinatesObj.longitude}`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const mesg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
      callback(Error(mesg));
      return;
    }

    const passes = JSON.parse(body).response;

    callback(error, passes);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
  
      fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        
        callback(error, flyOverTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };