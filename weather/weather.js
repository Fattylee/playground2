const request = require('request');
require('dotenv').config();

const getWeather = (latitude, longitude, callBack) => {

const url =  `https://api.darksky.net/forecast/${process.env.FORECAST_SECRET_KEY}/${latitude},${longitude}`;
  
  request({
    url,
    json: true
  }, (err, res, body) => {
    if (err) return callBack('An error occured, Cannot get weather info');
    else if (body.code === 400) return callBack(body.error);
    else if (body === 'Forbidden\n') return callBack('Invalid weather FORECAST_SECRET_KEY');
    
    callBack(undefined, {temperature: body.currently});
  });
};

module.exports = {
  getWeather,
};
