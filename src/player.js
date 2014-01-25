var player = {

	instance:null,

	enabled:false,

	init:function(){
		this.instance = game.add.sprite(100, game.world.height - 150, 'dude');
	    this.instance.body.bounce.y = 0;
	    this.instance.body.gravity.y = 15;
	    this.instance.body.collideWorldBounds = false;

	    this.instance.animations.add('left', [0, 1, 2, 3], 10, true);
    	this.instance.animations.add('right', [5, 6, 7, 8], 10, true);
      this.instance.events.onOutOfBounds.add(this.onOutOfBounds);

	},

  onOutOfBounds: function() {
    game.add.tween(filters.grayscale).to({ gray: 0 }, 1000).onCompleteCallback(restart).start();
  },

	update:function(){

		this.instance.animations.play('right');

		// ENTERING THE STAGE
		if(!this.enabled){

			if(this.instance.body.x < 50) {
		        this.instance.body.velocity.x = 90;
		    }else if(this.instance.body.x < 90) {
		    	// REDUCING SPEED
		        this.instance.body.velocity.x = 100 - (this.instance.body.x);
		    }else {
		        this.instance.body.velocity.x = 0;
		        this.enabled = true;
		    }

		}


	    // ONLY ENABLE PLAYER JUMP AFTER THE ENTERING STAGE BEEN COMPLETED
	    if(this.enabled){

	    	 // JUMP
	    	if (cursors.up.isDown && this.instance.body.touching.down)
	        {
	            this.instance.body.velocity.y = -600;
	        }

	    }




	}


};
