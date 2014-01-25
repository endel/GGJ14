var collector = {
	group: null,
	objects: [],
	addObject: function(level, x, y)
	{
		this.createGroup();

		var imageId, sprite;
		switch(level)
		{
			case 1:
				imageId = 'diamond';
				break;
			case 2:
				imageId = 'star';
				break;
			case 3:
				imageId = 'star';
				break;
		}

		sprite = game.add.sprite(x, y, imageId);
		sprite.name = imageId + this.objects.length;
	    sprite.y -= sprite.height;
		this.group.add(sprite);

		this.objects.push(sprite);
	},
	collisionHandler: function(sprite1, sprite2)
	{
		console.log(sprite2.name);
		sprite2.kill();

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
	refreshPosition: function()
	{
		this.group.x -= worldVelocity;

		game.physics.overlap(player.instance, this.group, this.collisionHandler);
	}
};