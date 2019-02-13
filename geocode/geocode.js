const request = require('request');
require('dotenv').config();

console.log('ENV:', process.env);

const geocode = (address) => {
  const encodedUrl = encodeURIComponent(address);
console.log(encodedUrl);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=${process.env.MAP_API_KEY}`,
  json: true
},
(error, response, body) => {
  if (error) return console.error('Cannot contact Google map api server, check host address/network and try again', error);
  // console.log(JSON.stringify(body, undefined, 2));
  console.log(body);
  if (body.status ==='INVALID_REQUEST') return console.log('Invalid request, missing address field');
  else if (body.status === 'ZERO_RESULTS') return console.log(`Bad address, Cannot process the address '${address}'`);
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
}
)
  
}

module.exports = {
  geocode
};