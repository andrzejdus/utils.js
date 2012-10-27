goog.provide('andrzejdus.utils.AnimationFrame');

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

var AnimationFrame = function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  var requestPolyfill = window.requestAnimationFrame;
  var cancelPolyfill = window.cancelAnimationFrame || window.cancelRequestAnimationFrame;
  
  for(var x = 0; x < vendors.length && !requestPolyfill; ++x) {
    requestPolyfill = window[vendors[x] + 'RequestAnimationFrame'];
    cancelPolyfill =
        window[vendors[x]+'CancelAnimationFrame'] ||
        window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!requestPolyfill) {
    requestPolyfill = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
      lastTime = currTime + timeToCall;
      
      return id;
    };
  }

  if (!cancelPolyfill) {
    cancelPolyfill = function(id) {
      clearTimeout(id);
    };
  }    
  
  this.getRequestFunction = function() {
    return requestPolyfill;
  };
  
  this.getCancelFunction = function() {
    return cancelPolyfill;
  };
}
