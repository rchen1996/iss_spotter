// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }

//     console.log('It worked! Returned coordinates:', coordinates);
//     fetchISSFlyOverTimes(coordinates, (error, data) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log('It worked! Returned fly over times:', data);
//       return;
//     });
//   });
// });

const { nextISSTimesForMyLocation, printPassTimes } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  printPassTimes(passTimes)
});

module.exports = { printPassTimes };