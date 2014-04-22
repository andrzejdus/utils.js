goog.provide('andrzejdus.utils.Looper');

/** @constructor */
var Looper = function(onLoopFrameListener) {
  var isLoopRunning = false;

  var deltaTime = null;
  var lastTime = null;

  this.start = function() {
    if (isLoopRunning === false) {
      isLoopRunning = true;

      // TODO Do wee need -1? If so explain why.
      lastTime = Date.now() - 1;

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
      var time = Date.now();
      deltaTime = time - lastTime;
      lastTime = time;

      requestAnimationFrame(onLoopFrame);

      onLoopFrameListener(deltaTime);
    }
  };
}
