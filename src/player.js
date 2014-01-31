var player = {

	instance:null,
  died: false,
	keyboardEnabled:false,

  // scoring
  score: 0,
  energies: { 'blue': 1, 'green': 1, 'red': 1 },

  energiesToShow: { 'blue': true, 'green': false, 'red': false },

  // adds score qty per color
  colorScore: { 'blue': 1, 'green': 5, 'red': 10 },

  // adds energy qty per color
  colorEnergy: { 'blue': 0.1, 'green': 0.05, 'red': 0.01 },
  colorSpeed: { 'blue': 0.05, 'green': 0.1, 'red': 0.2 },
  colorDownSpeed: 0.0005,

  // jump variables
  jumpVelocity: 500,
  jumpTime: 0,
  maxJumpTime: 150,
  jumpIncreaseRatio: 70,

  init:function(){
  	this.instance = game.add.sprite(100, 0, 'player');
  	this.instance.name = 'player';
  	this.instance.body.bounce.y = 0;
  	this.instance.body.gravity.y = 40;
  	this.instance.body.collideWorldBounds = false;
    this.instance.body.setSize(20, this.instance.height - 10, 20, 10);

		this.instance.animations.add('right', ['sprites_01.png', 'sprites_02.png', 'sprites_03.png', 'sprites_04.png', 'sprites_05.png', 'sprites_06.png', 'sprites_07.png', 'sprites_08.png', 'sprites_09.png', 'sprites_10'.png],
                                 15, true);
		this.instance.animations.add('jump', ['menina_pulando_05.png', 'menina_pulando_06.png', 'menina_pulando_07.png'],
                                 10, false);
		this.instance.animations.add('collide', ['menina_colidindo_01.png', 'menina_colidindo_02.png', 'menina_colidindo_03.png', 'menina_colidindo_04.png', 'menina_colidindo_05.png', 'menina_colidindo_06.png', 'menina_colidindo_07.png', 'menina_colidindo_08.png', 'menina_colidindo_09.png', 'menina_colidindo_10.png', 'menina_colidindo_11.png', 'menina_colidindo_12.png', 'menina_colidindo_13.png', 'menina_colidindo_14.png', 'menina_colidindo_15'.png],
                                 15, false);
		this.instance.animations.add('confused', ['menina_colidindo_06.png', 'menina_colidindo_07.png', 'menina_colidindo_08.png', 'menina_colidindo_09.png', 'menina_colidindo_10.png', 'menina_colidindo_11.png', 'menina_colidindo_12.png', 'menina_colidindo_13.png', 'menina_colidindo_14.png', 'menina_colidindo_15.png'],
                                 15, true);

    // this.instance
    this.instance.animations.play('right');
    this.instance.events.onOutOfBounds.add(this.onOutOfBounds);
	},

	onOutOfBounds: function() {
    // take sound down, and up again
    sound.setPlaybackRate(0.1, 500);

		game.add.tween(player.energies).to({
			green: 0,
			blue: 0,
			red: 0
		}, 700).onCompleteCallback(restart).start();
	},

	addEnergy: function(color) {
    worldVelocity += this.colorSpeed[color];
		this.energies[color] += this.colorEnergy[color];
		this.energies[color] = (this.energies[color] > 1) ? 1 : this.energies[color];
	},

	addScore: function(color) {
		this.score += this.colorScore[color];

    // lesser addEnergy
    worldVelocity += this.colorSpeed[color] / 2;
		this.energies[color] += (this.colorEnergy[color] / 3);
		this.energies[color] = (this.energies[color] > 1) ? 1 : this.energies[color];
	},

  kill: function() {
    var previousWorldVelocity = worldVelocity,
        previousPlaybackRate = Number(sound.playbackRate);
    game.add.tween(window).to({worldVelocity: 0}, 500).start();

    game.add.tween(player.energies).to({
      blue: Phaser.Math.clamp(player.energies.blue-0.7, 0, 1),
      green: Phaser.Math.clamp(player.energies.green-0.7, 0, 1),
      red: Phaser.Math.clamp(player.energies.red-0.7, 0, 1)
    }, 500).start();

    // take sound down, and up again
    sound.setPlaybackRate(0.5, 500).onCompleteCallback(function() {
      sound.setPlaybackRate(previousPlaybackRate, 1500);
    });

    if (this.died) {
      this.instance.play('confused');
      restart();
    } else {
      this.instance.play('collide');
    }

    setTimeout(function() {
      worldVelocity = previousWorldVelocity;
      player.instance.play('right');
    }, 1000);
  },

  update:function(){
    // decrease energy types
    var i = 1;
    for (var type in this.energies) {
      if (this.energies[type] > 0) {
        if(countdown > 0)
          continue;
        this.energies[type] -= this.colorDownSpeed;
      }
      i++;
    }

    // energies to show
    this.energiesToShow['green'] = (this.energies['blue'] > 0.8);
    this.energiesToShow['red'] = (this.energies['green'] > 0.8);

    this.died = (this.energies['blue'] <= 0 && this.energies['green'] <= 0 && this.energies['red'] <= 0);

    if (this.died) {
      this.kill();
      return false;
    }


    levels.barsUpdate();

    // ENTERING THE STAGE
    if(!this.keyboardEnabled) {
      if(this.instance.body.x < 50) {
        this.instance.body.velocity.x = 90;
      } else if(this.instance.body.x < 90) {
        // REDUCING SPEED
        this.instance.body.velocity.x = 100 - (this.instance.body.x);
      } else {
        this.instance.body.velocity.x = 0;
        this.keyboardEnabled = true;
      }
    }

    if (this.instance.body.touching.down && player.instance.animations.currentAnim.name!=="collide") {
      this.instance.animations.play('right');

      // ONLY ENABLE PLAYER JUMP AFTER THE ENTERING STAGE BEEN COMPLETED
      if(this.keyboardEnabled){
        // JUMP
        if (cursors.up.isDown || jumpKey.isDown) {
          this.instance.body.velocity.y = this.jumpVelocity * -1;
          this.jumpTime = game.time.now;
          this.instance.play('jump');
        }

      }

    } else if (this.instance.animations.currentAnim.name=="jump") {
      // increase jump velocity
      if ((cursors.up.isDown || jumpKey.isDown) && (game.time.now - this.jumpTime) < this.maxJumpTime) {
        this.instance.body.velocity.y -= this.jumpIncreaseRatio;
      }
    }
  }


};
