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

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  for (let pass of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
});