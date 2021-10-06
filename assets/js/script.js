let city;
let cityName;
let lat;
let lon;
let apiKey = 'b08eb93cc1596355f2ef187a75896064';
let searches = $("#pastSearches");
let searchForm = $("#searchForm");
let searchBox = $('#searchBox');
let searchButton = $('#searchButton');
let clearButton = $('#clearSearch')
let url1;
let url2;
let weather = {};
let current = $("#current");
let future = $("#future");
//pulls data from local storage and converts it back to an object
let pulledSearches = JSON.parse(localStorage.getItem("cities"));
//checks to see if pulledSearches is null, if not sets it to pulledSearches, if its null sets it to a object with an array.
let pastSearches = (pulledSearches !== null) ? pulledSearches : {searches:[]};


//fetch to get weather data
function getWeather(url)
{
    fetch(url)
        .then(function(responce)
        {
            //if not a 200 responce log the error
            if(responce.status !== 200)
            {
                $("#error").html("Error:Try another City, or check spelling")
                $("#error").css("display","block")
                throw Error(responce.statusText)
            }
            return responce.json();           
        })
        //pull the lat and lon from the first request and pass it to the url for the second fetch request
        .then(function(data){
            lat = data.coord.lat;
            lon = data.coord.lon;
            cityName = data.name;
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
                    if(!pastSearches.searches.includes(city) && city.length > 0)
                    {
                    pastSearches.searches.push(city)
                    }
                    localStorage.setItem('cities', JSON.stringify(pastSearches))
                    createHTML()
                })
            })
        .catch(function(error)
        {
            console.error("Error:", error)
        })

        
}
//builds the html for the current and future weather
function createHTML()
{
    current.html('');
    future.html('');
    current.css("border","2px black solid")
    let date = $("<h1>");
    let p1 = $("<p>");
    let p2 = $("<p>");
    let p3 = $("<p>");
    let p4 = $("<p>");
    date.text(cityName + ' ' + moment(weather.current.dt, 'X').format("M/D/YYYY"))
    p1.text(`Temp:${weather.current.temp}`)
    p2.text(`Wind:${weather.current.wind_speed} MPH`)
    p3.text(`Humidity:${weather.current.humidity}%`)
    p4.text(`UV Index:${weather.current.uvi}`)
    if(weather.current.uvi >= 6)
    {
        p4.css({'background-color':'red', 'width': '120px'})
    }
    else if(weather.current.uvi >= 3)
    {
        p4.css({'background-color':'yellow', 'width': '120px'})
    }
    else
    {
        p4.css({'background-color':'green', 'width': '120px'})
    }
    current.append(date,p1,p2,p3,p4)
    let content = '';
    for(let i = 1; i < 6; i++)
    {
        content += `<div class="futureWeather" ><p>${moment(weather.daily[i].dt, 'X').format("M/D/YYYY")}</p><img src=http://openweathermap.org/img/w/${weather.daily[i].weather[0].icon}.png><p>Temp:${weather.daily[i].temp.max}</p><p>Wind:${weather.daily[i].wind_speed}</p><p>Humidity:${weather.daily[i].humidity}</p></div>`
        future.html(content);
    }
    renderSearches()

    
}
//renders the past searches on the page
function renderSearches()
{
    let days = "";
    for(let i = 0; i < pastSearches.searches.length; i++)  
    {
        
        searches.html('');
        days += '<button type="button" class="pastSearches">'+ pastSearches.searches[i] + '</button>'
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

clearButton.click(function()
    {
        clearSearch()
    });
//pulls the value from the search box and sets the city in the url and calls the fetch function
function search()
{
    city = searchBox.val();
    url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b08eb93cc1596355f2ef187a75896064`;
    getWeather(url1);
    searchBox.val('');
    $("#error").css("display","none")
}

//sets the local storage to a empty object to clear the searches
function clearSearch()
{
    localStorage.setItem('cities', JSON.stringify({searches:[]}))
    location.reload();
}
    
$(document).ready(function()
{
    renderSearches()
});

