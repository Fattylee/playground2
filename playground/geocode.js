const request = require('request');
require('dotenv').config();

const getLocation = (address) => {
  return new Promise((resolve, reject) => {
     const encodedUrl = encodeURIComponent(address);

   request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}&key=${process.env.MAP_API_KEY}`,
    json: true
  },
  (error, response, body) => {
    if (error) return reject('Cannot contact Google map api server, check host address/network and try again');
    
    else if (body.status ==='INVALID_REQUEST') return reject('Invalid request, missing address field');
  
    else if (body.status === 'ZERO_RESULTS') return  reject(`Bad address, Cannot process the address '${address}'`);
  
  
  const successRes = {
    address: body.results[0].formatted_address,
    latitude: body.results[0].geometry.location.lat,
    longitude: body.results[0].geometry.location.lng
  };
    resolve(successRes);
  });
  
  });
    
};

module.exports = {
  getLocation,
};