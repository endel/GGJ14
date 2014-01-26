var player = {

	instance:null,
	keyboardEnabled:false,

  // scoring
  score: 0,
  energies: { 'blue': 0.5, 'green': 0, 'red': 0 },

  // adds score qty per color
  colorScore: { 'blue': 1, 'green': 5, 'red': 10 },

  // adds energy qty per color
  colorEnergy: { 'blue': 0.1, 'green': 0.05, 'red': 0.01 },

  init:function(){
  	this.instance = game.add.sprite(100, 0, 'player');
  	this.instance.name = 'player';
  	this.instance.body.bounce.y = 0;
  	this.instance.body.gravity.y = 17;
  	this.instance.body.collideWorldBounds = false;

		this.instance.animations.add('right', ['sprites_01.png', 'sprites_02.png', 'sprites_03.png', 'sprites_04.png', 'sprites_05.png', 'sprites_06.png', 'sprites_07.png', 'sprites_08.png', 'sprites_09.png', 'sprites_10'.png],
                                 15, true);
		this.instance.animations.add('jump', ['menina_pulando_05.png', 'menina_pulando_06.png', 'menina_pulando_07.png'],
                                 10, false);
		this.instance.animations.add('collide', ['menina_colidindo_01.png', 'menina_colidindo_02.png', 'menina_colidindo_03.png', 'menina_colidindo_04.png', 'menina_colidindo_05.png', 'menina_colidindo_06.png', 'menina_colidindo_07.png', 'menina_colidindo_08.png', 'menina_colidindo_09.png', 'menina_colidindo_10.png', 'menina_colidindo_11.png', 'menina_colidindo_12.png', 'menina_colidindo_13.png', 'menina_colidindo_14.png', 'menina_colidindo_15'.png],
                                 15, false);
		this.instance.animations.add('confused', ['menina_colidindo_06.png', 'menina_colidindo_07.png', 'menina_colidindo_08.png', 'menina_colidindo_09.png', 'menina_colidindo_10.png', 'menina_colidindo_11.png', 'menina_colidindo_12.png', 'menina_colidindo_13.png', 'menina_colidindo_14.png', 'menina_colidindo_15'.png],
                                 15, true);

    // this.instance
    this.instance.animations.play('right');
    this.instance.events.onOutOfBounds.add(this.onOutOfBounds);
	},

	onOutOfBounds: function() {
		game.add.tween(player.energies).to({
			green: 0,
			blue: 0,
			red: 0
		}, 700).onCompleteCallback(restart).start();
	},

	addEnergy: function(color) {
		this.energies[color] += this.colorEnergy[color];
		this.energies[color] = (this.energies[color] > 1) ? 1 : this.energies[color];
	},

	addScore: function(color) {
		this.score += this.colorScore[color];
	},

  kill: function() {
    var previousWorldVelocity = worldVelocity;
    game.add.tween(window).to({worldVelocity: 0}, 500).start();

    this.instance.play('collide');
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
        this.energies[type] -= (0.0005) * i;
      }
      i++;
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
        if (cursors.up.isDown) {
          this.instance.play('jump');
          this.instance.body.velocity.y = -600;
        }
      }

    }
  }


};
