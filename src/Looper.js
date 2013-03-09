goog.provide('andrzejdus.utils.Looper');

/** @constructor */
var Looper = function(onLoopFrameListener) {
  var isLoopRunning = false;

  var deltaTime = null;
  var lastTime = null;

  this.start = function() {
    if (isLoopRunning === false) {
      if (lastTime === null) {
        // TODO Do wee need -1? If so explain why.
        lastTime = new Date().getTime() - 1;
      }

      isLoopRunning = true;
      onLoopFrame();
    }
  };

  this.stop = function() {
    if (isLoopRunning === true) {
      isLoopRunning = false;
    }
  };

  var onLoopFrame = function() {
    if (isLoopRunning === true) {
      var time = new Date().getTime();
      deltaTime = time - lastTime;
      lastTime = time;

      requestAnimationFrame(onLoopFrame);

      onLoopFrameListener(deltaTime);
    }
  };
}
