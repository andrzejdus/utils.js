goog.provide('andrzejdus.utils.events.EventManager');

function EventManager(debug) {
  var targets = [];
  
  this.addEventListener = function(target) {
    if (target instanceof Function) {
      targets.push(target);
    }
    else {
      console.error('Couldn\'t add event listener. Target isn\'t a function.');
    }
  };
  
  this.removeEventListener = function(target) {
    if (target instanceof Function) {
      var newTargets = [];
      
      for (var i = 0; i < targets.length; i++) {
        var currentTarget = targets[i];
        
        if (currentTarget !== target) {
          newTargets.push(currentTarget);
        }
      }
      
      targets = newTargets;
    }
    else {
      console.error('Couldn\'t remove event listener. Target isn\'t a function.');
    }
  };
  
  this.dispatch = function(a) {
    if (debug) {
      console.log('Dispatching to event listeners. Targets serialization: ' +
          JSON.stringify(targets));
    }

    // console.log(targets);
    for (var i = 0; i < targets.length; i++) {
      targets[i].apply(this, arguments);
    }
  };
}
