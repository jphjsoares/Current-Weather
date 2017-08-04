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


        //GET WEATHER AND OTHER CHEESY STUFF
        function getWeather(lat, lon){

            var urlString = api + lat + "&" + lon;

            $.getJSON(urlString, function(data){

                var degrees = data.main.temp;

                var unit = "c";

                var temperature = {
                    "degrees": degrees,
                    "unit": unit
                };

                var icon = data.weather[0].icon;

                $("#icon").attr("src", icon);

                $("#city-country").html(data.name + ", " + data.sys.country);

                $("#description").html(data.weather[0].main);

                $("#temp").html(temperature.degrees + " °C");


                console.log(data);


                function convert(){

                    if(temperature.unit == "c"){

                        temperature.degrees+=273.15;

                        $("#temp").html(temperature.degrees + " °F");

                        temperature.unit = "f";
                    }

                    else if (temperature.unit == "f") {

                        temperature.degrees-=273.15;

                        $("#temp").html(temperature.degrees + " °C");

                        temperature.unit = "c";

                    }

                }

                $("#toggle").click(function(){

                    convert();

                });

            });

        }

}); //end of document function
