var player = {

	instance:null,
	keyboardEnabled:false,

  // scoring
  score: 0,
  energies: { 'green': 0.5, 'blue': 0, 'red': 0 },

  // adds score qty per color
  colorScore: { 'green': 1, 'blue': 5, 'red': 10 },
  // adds energy qty per color
  colorEnergy: { 'green': 0.1, 'blue': 0.05, 'red': 0.01 },

  init:function(){
  	this.instance = game.add.sprite(100, 0, 'cora');
  	this.instance.name = 'player';
  	this.instance.body.bounce.y = 0;
  	this.instance.body.gravity.y = 17;
  	this.instance.body.collideWorldBounds = false;

		//this.instance.animations.add('left', [0,1,2,3,4,5,6,7,8,9,10], 20, true);
		this.instance.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11], 15, true);
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
		this.energies[color] = (this.energies[color] > 1)?1:this.energies[color];
	},

	addScore: function(color) {
		this.score += this.colorScore[color];
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

    this.instance.animations.play('right');

		// ENTERING THE STAGE
		if(!this.keyboardEnabled){

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


    // ONLY ENABLE PLAYER JUMP AFTER THE ENTERING STAGE BEEN COMPLETED
    if(this.keyboardEnabled){

    	 // JUMP
    	 if (cursors.up.isDown && this.instance.body.touching.down)
    	 {
    	 	this.instance.body.velocity.y = -600;
    	 }

    	}

    }

};
