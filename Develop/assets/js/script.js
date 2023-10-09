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
      });
        } else {
          console.log('Error: ' + response.statusText);
        }
      })

  }


  function setAutocomplete(data) {
    
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



  
  



    
    function getCityByName(cityConcatenated) {
      //Since I bring it the entire string with Pipes, I'm splitting the string below for the URL call
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
                  //Since this function only runs when I select an item from the dropdown, I'm calling the other functions here
                  getCurrentWeatherByLatLon(data);
                  getFutureWeatherByLatLon(data);
            });
              } else {
                console.log('Error: ' + response.statusText);
              }
            })

        

     }


     function getCurrentWeatherByLatLon(data) {
      
      var lat = data[0].lat;
      var lon = data[0].lon;
      var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=e74a690a9be35ece3c3d6e4a8361c78f&units=imperial";
        
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
              console.log(data);
              setCurrentWeather(data);
            });
              } else {
                return 'Error: ' + response.statusText;
              }
            })
     }


    function getFutureWeatherByLatLon(data) { 
        var lat = data[0].lat;
        var lon = data[0].lon;

        
        var url = "https://api.openweathermap.org/data/2.5/forecast/daily?lat="+lat+"&lon="+lon+"&appid=e74a690a9be35ece3c3d6e4a8361c78f&units=imperial";
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
                  createFiveDay(data.list);
                  console.log(data);
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
            console.log(data);
            card.append(cardBody);
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            fiveDayDiv.append(card);
        });
        


    }




    function setCurrentWeather(data) {
      var today = new Date();  //Wanted to not use day.js for fun
      var day = String(today.getDate()).padStart(2, '0');  //Current day as DD
      var month = String(today.getMonth() + 1).padStart(2, '0');  //Current month as MM
      var year = today.getFullYear(); //Full year as YYYY
      today = month + '/' + day + '/' + year;

        $("#cityname").text(data.name);
        $("#date").text(today);
        $("#temp").text("Current/high/low Temp: "+ Math.round(data.main.temp) + " 🔼" + Math.round(data.main.temp_max) + " 🔽" + Math.round(data.main.temp_min));
        $("#humidity").text("Humidity: "+ data.main.humidity);
        $("#wind").text("Windspeed: "+ data.wind.speed);
        $("#weatherIcon").attr("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        
        
    };



















    var array = ['one', 'two', 'three', 'four', 'five'];
    
    //getCityByName("Atlanta");
    //createFiveDay(array);
    //getDropdownInfo();


    $("#search").on("click", function() { 
        //var city = $("#city").val();
        //getCityByName(city);
    });

    $("#city").on("keyup", function(e) { 
      console.log(e.target.value);
      getAutcompleteInfo(e.target.value);
    });

  });