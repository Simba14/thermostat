$(document).ready(function() {
  var thermostat = new Thermostat();
  updateThermostatStatistics();

  $(document).ready(function() {
    $('#submit').click(function() {
      updateCity($('#location').val());
      callWeather($('#location').val());
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

  function callWeather(city) {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
    var token = '&appid=8e08a874f67c6b7363b617a55a2d8072';
    var units = '&units=metric'
    $.get(url + token + units, function(api) {
      $('#weather').text(api.main.temp);
    });
  }

});
