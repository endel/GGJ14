var platforms = {
	// array de plataformas
	grounds: [],
	// container de todas as plataformas
	group: null,
	// step da largura da plataforma
	tileWidth: 100,
	// step da posição vertical da plataforma
	tileY: 100,
	// largura do espaço vazio entre as plataformas
	tileInterval: 100,
	// posição X para a próxima inserção de plataforma
	nextX: 0,

	// inicializa o game
	init: function(game)
	{
		this.group = game.add.group();
		this.insertGround();
	},

	// insere uma plataforma de acordo com o level atual
	insertGround: function()
	{
		var ground, minTileSize, maxTileSize, tileSize, minTileY, maxTileY, tileY, currWidth, currHeight, currX;

		switch(game.level)
		{
			case 1:
				minTileSize = 6;
				maxTileSize = 8;
				minTileY = 3;
				maxTileY = 4;
				break;
			case 2:
				minTileSize = 4;
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
		tileY = tileY * this.tileY;
		currWidth = tileSize * this.tileWidth;

		currX = (this.grounds.length == 0)?this.tileInterval/-2:this.nextX + this.tileInterval/2;

		ground = game.add.sprite(currX, tileY, 'ground');
		this.group.add(ground);
		//ground = this.group.create(currX, tileY, 'ground');
		ground.width = currWidth;
		ground.body.immovable = true;

    ground.filters = filters.all;
		collector.addObject(1, (currX + (currWidth / 2)), tileY);

		if(this.grounds.length == 0)
		{
			player.instance.y = tileY - player.instance.height;
			this.nextX += ground.width;
		}
		else
		{
			this.nextX += ground.width + this.tileInterval;
		}
		this.grounds.push(ground);

	},

	// Retorna o total da largura que está sem plataformas.
	getEmptyWidth: function()
	{
		return game.width - (this.nextX + this.group.x);
	},

	// Função de enterFrame
	refreshPosition: function()
	{
		this.group.x -= worldVelocity;

		while(this.getEmptyWidth() > (game.width * -1))
		{
			this.insertGround();
		}

		for(var i = 0; i < this.grounds.length; ++i)
		{
			var ground = this.grounds[i];

			if(ground != null && (ground.x + ground.width) < (this.group.x * -1))
			{
				this.group.remove(ground);
				ground.kill();
				//this.grounds[i] = null;
			}
		}
	}
};
