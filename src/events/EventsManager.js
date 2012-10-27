goog.provide('andrzejdus.utils.events.EventsManager');

goog.require('andrzejdus.utils.events.EventManager');

function EventsManager(debug) {
  var eventManagers = {};

  this.registerType = function(type) {
    if (debug) {
      console.log('Registering type "' + type + '".');
    }
    
    if (eventManagers[type] === undefined) {
      eventManagers[type] = new EventManager(debug);
    }
    else {
      console.error('Type "' + JSON.stringify(type) + '" already registered.');
    }
  };
  
  this.addEventListener = function(type, target) {
    if (debug) {
      console.log('Adding event listener for "' + type + '".');
    }
    
    if (eventManagers[type]) {
      eventManagers[type].addEventListener(target);
    }
    else {
      console.error(
          'Couldn\'t add event. Type "' +
          JSON.stringify(type) +
          '" doesn\'t exist. Please use "registerType" method first.');
    }
  };
  
  this.removeEventListener = function(type, target) {
    if (debug) {
      console.log('Removing event listener for "' + type + '".');
    }

    if (eventManagers[type]) {
      eventManagers[type].removeEventListener(target);
    }
    else {
      console.error(
          'Couldn\'t remove event. Type "' +
          JSON.stringify(type) +
          '" doesn\'t exist. Please use "registerType" method first.');
    }
  };
  
  this.dispatch = function(type) {
    if (debug) {
      console.log('Dispatching to event listeners for "' +
          type + '". Event managers serialization: ' + JSON.stringify(eventManagers));
    }

    if (eventManagers[type]) {
      var argumentsArray = Array.prototype.slice.call(arguments);
      argumentsArray.shift();
      eventManagers[type].dispatch.apply(this, argumentsArray);
    }
    else {
      console.error(
          'Couldn\'t dispatch event. Type "' +
          JSON.stringify(type) +
          '" doesn\'t exist. Please use "registerType" method first.');
    }
  };
}
