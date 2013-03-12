goog.provide('andrzejdus.utils.Utils');

var Utils = {
  delegate: function(context, functionToCall) {
    return function() {
      // TODO return value of function to callee
      return functionToCall.apply(context, arguments);
    };
  },

  getComputedStyle: function(element, property) {
    return element.currentStyle ?
        element.currentStyle[property] :
        window.getComputedStyle(element)[property];
  },

  addEventListener: function(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback);
    }
    else if (element.attachEvent) {
      element.attachEvent(eventName, callback);
    }
  },

  removeEventListener: function(element, eventName, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(eventName, callback);
    }
    else if (element.detachEvent) {
      element.detachEvent(eventName, callback);
    }
  },

  setScrollTop: function(value) {
    if (document.body !== undefined &&
        document.body.scrollTop != undefined) {
      document.body.scrollTop = value;
    }
    else {
      document.documentElement.scrollTop = value;
    }
  }
};
