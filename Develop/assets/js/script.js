$(document).ready(function() {

    
    function getCityByName(cityName) {
        var url = "http://api.openweathermap.org/geo/1.0/direct?q="+ cityName +",US&limit=1&appid=e74a690a9be35ece3c3d6e4a8361c78f";
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
                 console.log(data[0].lat + " " + data[0].lon)
                 getWeatherByLatLon(data[0].lat, data[0].lon);
            });
              } else {
                console.log('Error: ' + response.statusText);
              }
            })



     }



    function getWeatherByLatLon(lat, lon) { 
        //var url = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=e74a690a9be35ece3c3d6e4a8361c78f"

        var url = "api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=e74a690a9be35ece3c3d6e4a8361c78f";
        fetch(url, {
            method: 'GET'
          })
            .then(function(response) {
              if (response.ok) {
                response.json()
            .then(function(data) {
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
            card.append(cardBody);
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            fiveDayDiv.append(card);
        });
        


    }
    var array = ['one', 'two', 'three', 'four', 'five'];
    
    getCityByName("Atlanta");
    createFiveDay(array);


  });