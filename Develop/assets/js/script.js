$(document).ready(function() {

  function getAutcompleteInfo(cityName) {

    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=10&appid=e74a690a9be35ece3c3d6e4a8361c78f"
    fetch(url, {
      method: 'GET'
    })
      .then(function(response) {
        if (response.ok) {
          response.json()
      .then(function(data) {
            setAutocomplete(data); //gets and sets autocomplete info
            //setCurrentWeather(data); //gets and sets current weather info
            //getFutureWeatherByLatLon(data);
            //currentweather = getCurrentWeatherByLatLon(data[0].lat, data[0].lon);
            
      });
        } else {
          console.log('Error: ' + response.statusText);
        }
      })

  }


  function setAutocomplete(data) {
    console.log(data);
    var cities = [];
    data.forEach(entry => {cities.push(entry.name + " | " + entry.state + " | " + entry.country)});
     $("#city").autocomplete({ 
      source: cities,
      select: function( event, ui ) {
        console.log(ui.item.value);
        getCityByName(ui.item.value);
      }
     });
   };
  function setCurrentWeather(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e74a690a9be35ece3c3d6e4a8361c78f";
      
      fetch(url, {
          method: 'GET'
        })
          .then(function(response) {
            if (response.ok) {
              response.json()
          .then(function(data) {
            return data;
          });
            } else {
              return 'Error: ' + response.statusText;
            }
          })
   };
  function getFutureWeatherByLatLon(data) { };
  



    
    function getCityByName(cityConcatenated) {
        var cityName = cityConcatenated.split(" | ")[0];
        var stateName = cityConcatenated.split(" | ")[1];
        var countryName = cityConcatenated.split(" | ")[2];


        var url = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +","+ stateName +","+ countryName +"&limit=1&appid=e74a690a9be35ece3c3d6e4a8361c78f";
        console.log(url);
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
                  //var currentweather = {};
                  console.log(data);
                  currentweather = getCurrentWeatherByLatLon(data[0].lat, data[0].lon);
                  //getFutureWeatherByLatLon(data[0].lat, data[0].lon);
                  console.log(currentweather);
                  
            });
              } else {
                console.log('Error: ' + response.statusText);
              }
            })



     }


     function getCurrentWeatherByLatLon(lat, lon) {
      
          
     }


    function getFutureWeatherByLatLon(lat, lon) { 
        //var url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=e74a690a9be35ece3c3d6e4a8361c78f"

        var url = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=e74a690a9be35ece3c3d6e4a8361c78f";
        
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
                  return data
            });
              } else {
                console.log('Error: ' + response.statusText);
              }
            })
    }


    function createFiveDay(data){

        data.forEach(element => {
            var fiveDayDiv = $("#fiveday");
            fiveDayDiv.empty();
            var card = $("div");
            card.addClass("card");
            var cardBody = $("div");
            cardBody.addClass("card-body");
            var cardTitle = $("h5");
            cardTitle.addClass("card-title");
            var cardText = $("p");
            cardText.addClass("card-text");
            card.append(cardBody);
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            fiveDayDiv.append(card);
        });
        


    }
    var array = ['one', 'two', 'three', 'four', 'five'];
    
    //getCityByName("Atlanta");
    //createFiveDay(array);
    //getDropdownInfo();


    $("#search").on("click", function() { 
        //var city = $("#city").val();
        //getCityByName(city);
    });

    $("#city").keyup(function(e) { 
      console.log(e.target.value);
      getAutcompleteInfo(e.target.value);
    });

  });