const request = require('request');

const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/98389556f7085adb5f515a38773a5688/" + lat+ "," + long;

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback("No connection to the serverr", undefined);
        }else if(body.error)
        {
            callback("Please enter good coordinates");
        }else{
            callback(undefined, {
                temperature : body.currently.temperature,
                timezone: body.timezone,
                summary: body.currently.summary

            })
        }
    });
}

module.exports = forecast