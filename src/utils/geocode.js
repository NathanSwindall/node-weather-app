const request = require("request");
const mapbox_key = "pk.eyJ1IjoibmF0aGFuc3dpbmRhbGwyMDEwIiwiYSI6ImNrOHJqNm9mMzBjeGMzbG4wajM1YTAzOWgifQ.0sPv8w2sr_1sctm6229jNg"

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + mapbox_key + "&limit=1"

    request({url: url, json: true}, (error, {body}) => {
        if(error)
        {
            callback("Unable to connect to Service", undefined);
        }else if(body.features.length == 0)
        {
            callback("Sorry, the address you entered is invalid. Please try again.", undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
} 


module.exports = geocode