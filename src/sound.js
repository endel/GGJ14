var sound = {
  initialized: false,
  base: null,
  playbackRate: 1,
  lastPlaybackRate: 1,

  load: function() {
    game.load.audio('sound-base', 'assets/songs/base.mp3');
    game.load.audio('sound-basssynths', 'assets/songs/basssynths.mp3');
    game.load.audio('sound-highvoices', 'assets/songs/highvoices.mp3');
  },

  init: function() {
    initialized = true;

    this.base = game.add.audio('sound-base', 1, true);
    this.basssynths = game.add.audio('sound-basssynths', 1, true);
    this.highvoices = game.add.audio('sound-highvoices', 1, true);

    this.base.play('', 0, 1, true);
    this.basssynths.play('', 0, 0, true);
    this.highvoices.play('', 0, 0, true);
  },

  setLevel: function(level) {
    if(this.initialized == false) {return null;}
    
    switch(level) {
      case 1:
        game.add.tween(this.base).to({volume: 1}, 1000).start();
        game.add.tween(this.basssynths).to({volume: 0.1}, 1000).start();
        game.add.tween(this.highvoices).to({volume: 0.1}, 1000).start();
        break;
      case 2:
        game.add.tween(this.base).to({volume: 1}, 1000).start();
        game.add.tween(this.basssynths).to({volume: 0.2}, 1000).start();
        game.add.tween(this.highvoices).to({volume: 0.2}, 1000).start();
        break;
      case 3:
        game.add.tween(this.base).to({volume: 1}, 1000).start();
        game.add.tween(this.basssynths).to({volume: 1}, 1000).start();
        game.add.tween(this.highvoices).to({volume: 1}, 1000).start();
        break;
    }
  },

  setPlaybackRate: function(rate, interval) {
    if(this.initialized == false) {return null;}

    if (!interval) {
      interval = 1;
    }
    this.lastPlaybackRate = rate;

    game.add.tween(this.base._sound.playbackRate).to({value: rate}, interval).start();
    game.add.tween(this.basssynths._sound.playbackRate).to({value: rate}, interval).start();
    var tween = game.add.tween(this.highvoices._sound.playbackRate).to({value: rate}, interval).start();
    return tween;
  }


}
