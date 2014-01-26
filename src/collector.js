var collector = {
	group: null,
	objects: [],

	add: function(level, type, x, y)
	{
    var numFrames = 39;
		var color, sprite;

		this.createGroup();

		switch(level)
		{
			case 1:
				color = 'blue';
				break;
			case 2:
				color = 'green';
				break;
			case 3:
				color = 'red';
				break;
		}

		sprite = game.add.sprite(x, y, type + '-' + color);
    sprite.name = type;
    sprite.color = color;

    switch(type) {
      case 'point':
        // sprite.
        break;
      case 'energy':
        break;
    }

    var frames = [];
    for (var i = 0, l = numFrames; i < l; i ++) {
      frames.push(type + '-' + color + '/' + (String("0000" + i).slice(-4)));
    }

    sprite.animations.add('default', frames, 16, true);
    sprite.play('default');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.y -= sprite.height / 2;
		this.group.add(sprite);

		this.objects.push(sprite);
	},

	collisionHandler: function(sprite1, sprite2)
	{

    if (sprite2.name == 'energy') {
      player.addEnergy(sprite2.color);
    } else if (sprite2.name == 'point') {
      player.addScore(sprite2.color);
    }

    game.add.tween(sprite2).to({alpha: 0}, 200).onCompleteCallback(function() {
      sprite2.kill();
    }).start();
		return false;
	},

	createGroup: function()
	{
		if(this.group == null)
		{
			this.group = game.add.group();
		}
	},

	// Função de enterFrame
	update: function()
	{
		if(this.group)
		{
			this.group.x -= worldVelocity;

			game.physics.overlap(player.instance, this.group, this.collisionHandler);

			for(var i = 0; i < this.objects.length; ++i)
			{
				var object = this.objects[i];

				if(object != null && (object.x + object.width) < (this.group.x * -1))
				{
					this.group.remove(object);
					object.kill();
				}
			}
		}
	}
};
