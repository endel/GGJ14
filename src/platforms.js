var platforms = {
	levelX:0,
	group: null,
	tileWidth: 100,
	tileHeight: 100,
	init: function(game)
	{
		platforms.group = game.add.group();

		platforms.insertPlatform();
	},
	insertPlatform: function()
	{
		var minTileSize, maxTileSize, tileSize, minTileY, maxTileY, tileY, currWidth, currHeight;

		switch(game.level)
		{
			case 1:
				minTileSize = 8;
				maxTileSize = 10;
				minTileY = 3;
				maxTileY = 4;
				break;
			case 2:
				minTileSize = 5;
				maxTileSize = 10;
				minTileY = 2;
				maxTileY = 4;
				break;
			case 3:
				minTileSize = 3;
				maxTileSize = 10;
				minTileY = 1;
				maxTileY = 5;
				break;
		}
		tileSize = Math.floor(((maxTileSize + 1) - (minTileSize - 1)) * Math.random()) + minTileSize;
		tileY = Math.floor(((maxTileY + 1) - (minTileY - 1)) * Math.random()) + minTileY;
		tileY = tileY * platforms.tileHeight;
		currWidth = tileSize * platforms.tileWidth;

		console.log('tileY: ' + tileY);
		console.log('currWidth: ' + currWidth);

	},
	refreshPosition: function(currX)
	{
		
	}
};



    /*platforms.group = game.add.group();
    ground = platforms.group.create(0, game.world.height - 64, 'ground');
    ground.body.immovable = true;*/