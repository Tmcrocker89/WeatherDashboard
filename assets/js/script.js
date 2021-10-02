let apiKey = 'b08eb93cc1596355f2ef187a75896064';
//let url = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=34.503441&lon=-82.65&exclude=hourly,minutely&units=imperial&appid=9abc24e2bd82a06cffa0711c49b6f93b`;
let searchBox = $('#searchBox')
let searchButton = $('#searchButton');
let weather = {};
let current = $("#current");
let future = $("#future");
let h1 = $("<h1>")
let p = $("<p>")
let city;
//let length = Object.keys(weather['current]).length;


function getWeather()
{
    fetch(url)
        .then(function(responce)
        {
            return responce.json();
        })
        .then(function(responce){
            weather = responce;
            console.log(weather)
            createHTML()
        })
        
}

function createHTML()
{
    let date = h1;
    let p1 = $("<p>");
    let p2 = $("<p>");
    let p3 = $("<p>");
    let p4 = $("<p>");
    date.text(city + ' ' + moment(weather.current.dt, 'X').format("M/D/YYYY"))
    p1.text(`Temp:${weather.current.temp}`)
    p2.text(`Wind:${weather.current.wind_speed} MPH`)
    p3.text(`Humidity:${weather.current.humidity}%`)
    p4.text(`UV Index:${weather.current.uvi}`)
    current.append(date,p1,p2,p3,p4)
}

searchButton.click(function()
{
    getWeather();
    city = searchBox.val();

})
    


//current location/date
//current temp, wind, humidity, uv index
//5 day date,symbol,temp,wind,humidity