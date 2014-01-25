var platforms = {
	// array de plataformas
	grounds: [],
	//
	visibleGroup: null,
	//
	collideGroup: null,
	// step da largura da plataforma
	tileWidth: 100,
	// step da posição vertical da plataforma
	tileY: 100,
	// largura do espaço vazio entre as plataformas
	tileInterval: 100,
	// posição X para a próxima inserção de plataforma
	nextX: 0,

	centerTexture1: null,
	centerTexture2: null,
	centerTexture3: null,

	// inicializa o game
	init: function()
	{
		centerTexture1 = game.add.renderTexture('platform1-2', 357, 568);
		centerTexture2 = game.add.renderTexture('platform2-2', 357, 568);
		centerTexture3 = game.add.renderTexture('platform3-2', 357, 568);
		this.collideGroup = game.add.group();
		this.visibleGroup = game.add.group();
		this.insertGround();
	},

	// insere uma plataforma de acordo com o level atual
	insertGround: function()
	{
		var ground, visibleGround1, visibleGround2, visibleGround3, minTileSize, maxTileSize, tileSize, minTileY, maxTileY, tileY, currWidth, currHeight, currX;

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

		// adicionando plataforma de colisão
		ground = game.add.sprite(currX, tileY, 'ground');
		this.collideGroup.add(ground);
		ground.width = currWidth;
		ground.height = 10;
		ground.body.immovable = true;

		// adicionando plataforma visível
		visibleGround1 = game.add.sprite(currX, tileY - 50, 'platform' + game.level + '-1');
		this.visibleGroup.add(visibleGround1);

		visibleGround3 = game.add.sprite(currX, tileY - 50, 'platform' + game.level + '-3');
		visibleGround3.x = (currX + currWidth) - visibleGround3.width;
		this.visibleGroup.add(visibleGround3);

		visibleGround2 = game.add.sprite(currX + visibleGround1.width, tileY - 50, 'platform' + game.level + '-2');
		visibleGround2.width = currWidth - (visibleGround1.width + visibleGround3.width);
		this.visibleGroup.add(visibleGround2);

		collector.addObject(1, (currX + (currWidth / 2)), tileY);



		if(this.grounds.length == 0)
		{
			// funciona na máquina do Anderson, mas na minha não
			//player.instance.y = tileY - player.instance.height;
			this.nextX += ground.width;
		}
		else
		{
			this.nextX += ground.width + this.tileInterval;
		}
		this.grounds.push(ground);
		this.grounds.push(visibleGround1);
		this.grounds.push(visibleGround2);
		this.grounds.push(visibleGround3);

	},

	// Retorna o total da largura que está sem plataformas.
	getEmptyWidth: function()
	{
		return game.width - (this.nextX + this.collideGroup.x);
	},

	// Função de enterFrame
	refreshPosition: function()
	{
		this.collideGroup.x -= worldVelocity;
		this.visibleGroup.x -= worldVelocity;

		while(this.getEmptyWidth() > (game.width * -1))
		{
			this.insertGround();
		}

		for(var i = 0; i < this.grounds.length; ++i)
		{
			var ground = this.grounds[i];

			if(ground != null && (ground.x + ground.width) < (this.collideGroup.x * -1))
			{
				this.collideGroup.remove(ground);
				ground.kill();
				//this.grounds[i] = null;
			}
		}
	}
};
