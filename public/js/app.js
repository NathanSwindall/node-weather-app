const get_weather = (url, callback) => fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
           callback(data.error, undefined)
        }else
        {
            callback(undefined, data)
        }
    })
});



//const weather_api_url = "http://localhost:3001/weather?address="    // actually don't need the whole address
const weather_api_url = "/weather?address="
const weatherform = document.querySelector(".form_weather_forecast")
const search_item = document.querySelector('.weather_address');
const message_1 = document.querySelector('#message_1');
const message_2 = document.querySelector('#message_2');


weatherform.addEventListener('submit',(e) => {
    e.preventDefault() // prevents the screen from refreshing again

    const location = search_item.value
    const complete_url = weather_api_url + location

    //set loading values
    message_1.textContent = "Loading..."
    message_2.textContent = ""


    get_weather(complete_url, (error, response) => {
        if(error)
        {
            message_1.textContent = ""
            message_2.textContent = error
        }else
        {
            message_1.textContent = response.location
            message_2.textContent = "The Weather is " + response.summary.toLowerCase() + " with a temperature of " + response.temperature + " F."
        }

    })
    
})



// old code 

/*
console.log("Woah, I just ran my own javascript side code");

fetch("http://puzzle.mead.io/puzzle").then((response) =>
{
    response.json().then((data) => {
        console.log(data);
    })
})


*/