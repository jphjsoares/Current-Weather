$(document).ready(function() {
    var api = "https://fcc-weather-api.glitch.me/api/current?";

    if (navigator.geolocation)  {

        navigator.geolocation.getCurrentPosition(function(position){

            //GET THE COORDS
            var lat = "lat=" + position.coords.latitude;
            var lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
            })

        } else {
            alert("Geolocation is not supported by this browser");
        }

        function getWeather(lat, lon){
            var urlString = api + lat + "&" + lon;
            $.getJSON(urlString, function(data){
                $("#city-country").html(data.name + ", " + data.sys.country);
                $("#description").html(data.weather[0].main);
                $("#temp").html(data.main.temp + " °C");
                console.log(data);
            });
        }

}); //end of document function
