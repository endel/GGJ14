var sound = {
  initialized: false,
  base: null,
  playbackRate: 0.99,
  lastPlaybackRate: 0.99,

  load: function() {
    game.load.audio('sound-base', 'assets/songs/base.wav');
    game.load.audio('sound-basssynths', 'assets/songs/basesynths.wav');
    game.load.audio('sound-highvoices', 'assets/songs/highvoices.wav');
  },

  init: function() {
    this.initialized = true;

    this.base = game.add.audio('sound-base', 1, true);
    this.basssynths = game.add.audio('sound-basssynths', 1, true);
    this.highvoices = game.add.audio('sound-highvoices', 1, true);


    this.base.play('', 0, 0, true);
    this.basssynths.play('', 0, 0, true);
    this.highvoices.play('', 0, 0, true);

    this.setPlaybackRate(this.playbackRate, 1);
  },

  setLevel: function(level) {
    if(this.initialized == false) {return null;}

    console.log(level, "oi endel");

    switch(level) {
      case 1:
        // game.add.tween(this.base._sound).to({volume: 0.5}, 1000).start();
        // game.add.tween(this.basssynths._sound).to({volume: 0.3}, 1000).start();
        // game.add.tween(this.highvoices._sound).to({volume: 1}, 1000).start();
        break;
      case 2:
        // game.add.tween(this.base._sound).to({volume: 0.1}, 1000).start();
        // game.add.tween(this.basssynths._sound).to({volume: 0.2}, 1000).start();
        // game.add.tween(this.highvoices._sound).to({volume: 0.2}, 1000).start();
        break;
      case 3:
        // game.add.tween(this.base._sound).to({volume: 1}, 1000).start();
        // game.add.tween(this.basssynths._sound).to({volume: 1}, 1000).start();
        // game.add.tween(this.highvoices._sound).to({volume: 1}, 1000).start();
        break;
    }
  },

  setPlaybackRate: function(rate, interval) {
    if (!interval) {
      interval = 1;
    }
    this.lastPlaybackRate = rate;

    game.add.tween(this.base._sound.playbackRate).to({value: rate}, interval).start();
    game.add.tween(this.basssynths._sound.playbackRate).to({value: rate}, interval).start();

    var tween = game.add.tween(this.highvoices._sound.playbackRate).to({value: rate}, interval).start();
    return tween;
  }


};
