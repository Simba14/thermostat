$(document).ready(function() {
  var thermostat = new Thermostat();
  updateThermostatStatistics();

  $(document).ready(function() {
    $('#submit').click(function() {
      updateCity($('#location').val());
      callWeather($('#location').val());
      backgroundPhoto($('#location').val());
    });
  });

  $('#temperature-increase').click(function() {
    thermostat.increase();
    updateThermostatStatistics();
  });

  $('#temperature-decrease').click(function(){
    thermostat.decrease();
    updateThermostatStatistics();
  });

  $('#temperature-reset').click(function(){
    thermostat.reset();
    updateThermostatStatistics();
  });

  $('#powersaving-on').click(function() {
    thermostat.powerSavingModeOn();
    updateThermostatStatistics();
  });

  $('#powersaving-off').click(function() {
    thermostat.powerSavingModeOff();
    updateThermostatStatistics();
  });

  function updateTemperature() {
    $('#temperature').text(thermostat.temp);
  }

  function updateEnergyUsage() {
    $('#temperature').attr('class', thermostat.currentEnergyUsage());$
  }

  function updatePowerSavingStatus() {
    if (thermostat.powerSavingMode == true) {
      $('#power-saving-mode').text('on');
    } else if (thermostat.powerSavingMode == false) {
      $('#power-saving-mode').text('off');
    }
  }

  function updateThermostatStatistics() {
    updateTemperature();
    updateEnergyUsage();
    updatePowerSavingStatus();
  }

  function updateCity(cityInput) {
    $('#city').text(cityInput);
  }

  function backgroundPhoto(city) {
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    var token = '&api_key=79eb26f0b80e9c421a4e3d5614d3f250';
    var tags = '&tags=public&' + city
    var json = '&format=json&jsoncallback=?';
    $.getJSON(url + token + tags +json, function(data) {
      console.log(data.photos.photo[50].id);
      var id = (data.photos.photo[50].id);
      var server = (data.photos.photo[50].server)
      var farm = (data.photos.photo[50].farm)
      var secret = (data.photos.photo[50].server)
      var callurl = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg"
      console.log(callurl)
      $('body').attr({"style":"background-image: url('" + callurl + "')"});//url("https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg")')
    });
  }

  function callWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=8e08a874f67c6b7363b617a55a2d8072';
    var units = '&units=metric'
    $.get(url + token + units, function(api) {
      $('#weather').text(api.main.temp);
    });
  }

});
