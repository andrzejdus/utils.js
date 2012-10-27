goog.provide('andrzejdus.utils.Log');

/** @define {boolean} */
var DEBUG = true;

var Log = (function() {
  
  this.l = function(message) {
    // fix for IE without developer tools open 
    try {
      console
    }
    catch (exception) {
      console = {};
    }
    
    if (DEBUG && console && console.log) {
      var error = new Error;
      var stack = error ? error.stack : null; 
      if (stack && console.groupCollapsed && console.groupEnd) {
        var lineNumber = 2;
        if (stack.search("Error") >= 0) {
          lineNumber = 3;
        }
        
        var stackSplit = null;
        if (stack.split('\n').length >= lineNumber) {
          stackSplit = stack.split('\n'); 
        }
        
        console.groupCollapsed(
            message +
            ' [' +
            stackSplit[lineNumber - 1].split('/').pop().replace(/\)*\n\s*/g, '') +
            ']'
        );
        
        console.log(stack.replace(/^Error/, "STACK TRACE"));
        
        console.groupEnd();      
      }
      else {
        console.log(message);
      }
    }
  };
  
  return this;
})();
