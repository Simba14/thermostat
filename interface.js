$(document).ready(function() {
  var thermostat = new Thermostat();
  updateTemperature();
  callWeather();

  $('#temperature-increase').click(function() {
    thermostat.increase();
    updateTemperature();
  });

  $('#temperature-decrease').click(function(){
    thermostat.decrease();
    updateTemperature();
  });

  $('#temperature-reset').click(function(){
    thermostat.reset();
    updateTemperature();
  });

  $('#powersaving-on').click(function() {
    thermostat.powerSavingModeOn();
    $('#power-saving-mode').text('on');
    updateTemperature();
  });

  $('#powersaving-off').click(function() {
    thermostat.powerSavingModeOff();
    $('#power-saving-mode').text('off');
    updateTemperature();
  });



  function updateTemperature() {
    $('#temperature').text(thermostat.temp);
    $('#temperature').attr('class', thermostat.currentEnergyUsage());
  }

  function callWeather() {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=8e08a874f67c6b7363b617a55a2d8072&units=metric', function(api) {
      $('#weather').text(api.main.temp);
    });
  })

});
