let city;
let cityName;
let lat;
let lon;
let apiKey = 'b08eb93cc1596355f2ef187a75896064';
let searches = $("#pastSearches");
let searchForm = $("#searchForm");
let searchBox = $('#searchBox');
let searchButton = $('#searchButton');
//let url = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
let url1;
let url2;
let weather = {};
let current = $("#current");
let future = $("#future");
let h1 = $("<h1>")
let p = $("<p>")
let pulledSearches = JSON.parse(localStorage.getItem("cities"));
let pastSearches = (pulledSearches !== null) ? pulledSearches : {searches:[]};

//let length = Object.keys(weather['current]).length;


function getWeather(url)
{
    fetch(url)
        .then(function(responce)
        {
            return responce.json();
        })
        .then(function(data){
            lat = data.coord.lat;
            lon = data.coord.lon;
            cityName = data.name
            console.log(data)
            url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial&appid=9abc24e2bd82a06cffa0711c49b6f93b`;
            
        })
        .then(function(responce)
            {
                fetch(url2)
                .then(function(responce)
                {
                    return responce.json();
                })
                .then(function(responce)
                {
                    weather = responce;
                    console.log(responce);
                    createHTML()
                })
            })
        
}

function createHTML()
{
    current.html('');
    future.html('');
    let date = h1;
    let p1 = $("<p>");
    let p2 = $("<p>");
    let p3 = $("<p>");
    let p4 = $("<p>");
    date.text(cityName + ' ' + moment(weather.current.dt, 'X').format("M/D/YYYY"))
    p1.text(`Temp:${weather.current.temp}`)
    p2.text(`Wind:${weather.current.wind_speed} MPH`)
    p3.text(`Humidity:${weather.current.humidity}%`)
    p4.text(`UV Index:${weather.current.uvi}`)
    current.append(date,p1,p2,p3,p4)
    let div0 = $("<div>");
    let div1 = $("<div>");
    let div2 = $("<div>");
    let div3 = $("<div>");
    let div4 = $("<div>");
    div0.addClass("futureWeather")
    div1.addClass("futureWeather")
    div2.addClass("futureWeather")
    div3.addClass("futureWeather")
    div4.addClass("futureWeather")
    div0.html(`<p>${moment(weather.daily[1].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[1].weather[0].icon}.png><p>Temp:${weather.daily[0].temp.max}</p><p>Wind:${weather.daily[1].wind_speed}</p><p>Humidity:${weather.daily[1].humidity}</p>`)
    div1.html(`<p>${moment(weather.daily[2].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[2].weather[0].icon}.png><p>Temp:${weather.daily[1].temp.max}</p><p>Wind:${weather.daily[2].wind_speed}</p><p>Humidity:${weather.daily[2].humidity}</p>`)
    div2.html(`<p>${moment(weather.daily[3].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[3].weather[0].icon}.png><p>Temp:${weather.daily[2].temp.max}</p><p>Wind:${weather.daily[3].wind_speed}</p><p>Humidity:${weather.daily[3].humidity}</p>`)
    div3.html(`<p>${moment(weather.daily[4].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[4].weather[0].icon}.png><p>Temp:${weather.daily[3].temp.max}</p><p>Wind:${weather.daily[4].wind_speed}</p><p>Humidity:${weather.daily[4].humidity}</p>`)
    div4.html(`<p>${moment(weather.daily[5].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[5].weather[0].icon}.png><p>Temp:${weather.daily[4].temp.max}</p><p>Wind:${weather.daily[5].wind_speed}</p><p>Humidity:${weather.daily[5].humidity}</p>`)
    future.append(div0,div1,div2,div3,div4);
    renderSearches()

    
}

function renderSearches()
{
    let days = "";
    for(let i = 0; i < pastSearches.searches.length; i++)  
    {
        
        searches.html('');
        days += '<button type="button" class="pastSearches">'+ pastSearches.searches[i] + '</button>'
        console.log(days)
        searches.html(days)

    }
}
searchButton.click(function()
{
    search()
})
searchForm.submit(function(event)
{
    event.preventDefault()
    search()
})

$( document ).on("click", ".pastSearches", function(event)
{
    searchBox.val(event.target.textContent)
    search()
})

function search()
{
    city = searchBox.val();
    console.log(city)
    url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b08eb93cc1596355f2ef187a75896064`;
    console.log(url1)
    getWeather(url1);
    console.log(city)
    if(!pastSearches.searches.includes(city) && city.length > 0)
    {
    pastSearches.searches.push(city)
    }
    localStorage.setItem('cities', JSON.stringify(pastSearches))
    searchBox.val('');
}
    
$(document).ready(function()
{
    renderSearches()
});

