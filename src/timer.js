var timer = {
  countdownToSpeedUp: 100,
  interval: null,

    // PROTOTYPE SPEEDUP -- REMOVE WHEN CORRECT SPEEDUP IMPLEMENTED --
    /*countdownToSpeedUp--;
    if(countdownToSpeedUp <= 0) {
        countdownToSpeedUp = 100;
        worldVelocity++;
    }*/

  init: function() {
    this.interval = window.setInterval(this.tick, 2000);
  },

  tick: function() {
  }
};
