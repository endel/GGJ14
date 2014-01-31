var collector = {
	group: null,
	objects: [],

	add: function(color, type, x, y)
	{
    var sprite, numFrames = 39;

		this.createGroup();
		sprite = game.add.sprite(x, y, type + '-' + color);
    sprite.name = type;
    sprite.color = color;

    var frames = [];
    for (var i = 0, l = numFrames; i < l; i ++) {
      frames.push('item-' + type + '-' + color + '/' + (String("0000" + i).slice(-4)));
    }

    sprite.animations.add('default', frames, 16, true);
    sprite.play('default');
    sprite.anchor.setTo(0.5, 0.5);
    sprite.body.setSize(20, 20, -5, -15);
    sprite.y -= sprite.height / 2;
		this.group.add(sprite);

		this.objects.push(sprite);
	},

	collisionHandler: function(sprite1, sprite2)
	{
    sprite2.alive = false;

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
