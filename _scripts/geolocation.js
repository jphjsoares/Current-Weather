    $(document).ready(function() {

        var api = "https://fcc-weather-api.glitch.me/api/current?";
       
        //Get geolocation
        if("geolocation" in navigator) {
                //Geolocation options
                var options = {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                };

                //If it succeeded to get current postion
                function success(pos) {
                    var crd = pos.coords;
                    var lat = "lat=" + crd.latitude;
                    var lon = "lon=" + crd.longitude;
                    getWeather(lat, lon);
                    
                };
                
                //If it failed to get current position
                function error(err) {
                    alert(`ERROR(${err.code}): ${err.message}`);
                };

                navigator.geolocation.getCurrentPosition(success, error, options);

            } else {
                alert("Something went wrong!\nWe couldn't find your location!");
            }


            //GET WEATHER AND OTHER CHEESY STUFF
            function getWeather(lat, lon){

                var urlString = api + lat + "&" + lon;

                $.getJSON(urlString, function(data){
                    console.log(data);
                    var degrees = parseFloat(data.main.temp);


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

                        //Convert to fahrenheit
                        if(temperature.unit == "c"){

                            temperature.degrees = (temperature.degrees*1.8) + 32;

                            $("#temp").html(temperature.degrees + " °F");

                            temperature.unit = "f";
                        }

                        //Convert to Celsius
                        else if (temperature.unit == "f") {

                            temperature.degrees = (temperature.degrees - 32)/1.8;

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
