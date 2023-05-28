const request = require("request");

const forecast = (latitude, longitude, callback) => {
  debugger;
  const url = `http://api.weatherstack.com/current?access_key=9701b8a37f782d1ef9446f87eb3bba69&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    //const data = JSON.parse(response.body);
    debugger;
    if (error) {
      callback("unable to get the weather details", undefined);
    } else if (body.error) {
      callback("unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. The current temperature is ${body.current.temperature} But it feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
