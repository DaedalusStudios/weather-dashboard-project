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
        setCityInHistory(ui.item.value);
        getCityByName(ui.item.value);
      }
     });
   };



  
  



    
    function getCityByName(cityConcatenated) {
      //Since I bring it the entire string with Pipes, I'm splitting the string below for the URL call
        var cityName = cityConcatenated.split(" | ")[0];
        var stateName = cityConcatenated.split(" | ")[1];
        var countryName = cityConcatenated.split(" | ")[2];
        console.log(cityName);

        var url = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +","+ stateName +","+ countryName +"&limit=1&appid=e74a690a9be35ece3c3d6e4a8361c78f";
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
                  //Since this function only runs when I select an item from the dropdown, I'm calling the other functions here
                  getCurrentWeatherByLatLon(data);
                  //getFutureWeatherByLatLon(data);
                  //I cannot get the five day because of an API error due to subscription
                  //If i use the hourly, I would only get one hour of data instead of a whole day
                  //Daily is locked behind a paywall
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
              setCurrentWeather(data);
            });
              } else {
                return 'Error: ' + response.statusText;
              }
            })
     }


    function setCityInHistory(city) { 
      var cityArray = JSON.parse(localStorage.getItem('DaedalusStudioscities')) || [];
      //cityArray = JSON.parse(localStorage.getItem("cities"));
      cityArray.push({city: city});
      console.log(cityArray);
      localStorage.setItem("DaedalusStudioscities", JSON.stringify(cityArray));
      getCityHistory();
    }

    $('.historicalSearch').on('click', function() { });



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









    
    
    function getCityHistory() {
      //Get the history list from locastorage
      var cityHistory = JSON.parse(localStorage.getItem("DaedalusStudioscities"));
      
      //Empty the list
      $("#citylist").empty();
      //Clear the input
      $("#city").val('');

      //If the list is empty, create an empty array
      if (cityHistory === null) {
        cityHistory = [];
      } else {
        //If the list is not empty, create the buttons
        cityHistory.forEach(item => {
          var city = item.city;
          var cityButton = $("<button>").text(city);
          cityButton.addClass("historicalSearch");
          $("#citylist").append(cityButton);
        });
        
        //creating the click event function dynamically because we're destroying and recreating the buttons
        $(".historicalSearch").on("click", function() { 
          getCityByName($(this).text());
        });
      }

      
    }
    
    getCityHistory();
    //removed search button because I'm just using the autocomplete list
    
    $("#city").on("keyup", function(e) { 
      getAutcompleteInfo(e.target.value);
    });

  });