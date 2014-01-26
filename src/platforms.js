var platforms = {

	// array de obstaculos
	obstacles: [],

	// array de plataformas
	grounds: [],

	platformsGroup: null,
	obstaclesGroup: null,

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
		this.platformsGroup = game.add.group();
		this.obstaclesGroup = game.add.group();
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

		// adicionando plataforma visível
		visibleGround1 = game.add.sprite(currX, tileY - 50, 'platform' + game.level + '-1');
		visibleGround1.body.immovable = true;
		visibleGround1.body.setSize(visibleGround1.width, 30, 0, 50);
		this.platformsGroup.add(visibleGround1);

		visibleGround3 = game.add.sprite(currX, tileY - 50, 'platform' + game.level + '-3');
		visibleGround3.body.immovable = true;
		visibleGround3.x = (currX + currWidth) - visibleGround3.width;
		visibleGround3.body.setSize(visibleGround3.width, 30, 0, 50);
		this.platformsGroup.add(visibleGround3);

		visibleGround2 = game.add.sprite(currX + visibleGround1.width, tileY - 50, 'platform' + game.level + '-2');
		var realWidth = visibleGround2.width;
		visibleGround2.body.immovable = true;
		visibleGround2.width = currWidth - (visibleGround1.width + visibleGround3.width);
		visibleGround2.body.setSize(realWidth, 30, 0, 50);
		this.platformsGroup.add(visibleGround2);

		collector.add(1, 'point', (currX + (currWidth / 2)) - 100 , tileY);
		collector.add(1, 'point', (currX + (currWidth / 2))       , tileY);
		collector.add(1, 'point', (currX + (currWidth / 2)) + 100 , tileY);
		collector.add(1, 'energy', (currX + (currWidth / 2))      , tileY - 100);

		this.insertObstacle((currX + (currWidth / 2)), tileY, 'large');

		if(this.grounds.length == 0)
		{
			// funciona na máquina do Anderson, mas na minha não
			//player.instance.y = tileY - player.instance.height;
			this.nextX += currWidth;
		}
		else
		{
			this.nextX += currWidth + this.tileInterval;
		}
		//this.grounds.push(ground);
		this.grounds.push(visibleGround1);
		this.grounds.push(visibleGround2);
		this.grounds.push(visibleGround3);

	},

	insertObstacle: function(x, y, size)
	{
		var sprite, textureName;

		size = (size == undefined)?'small':size;

		switch(game.level)
		{
			case 1:
			case 2:
				textureName = size + 'Obstacle1';
				break;
			case 3:
				textureName = size + 'Obstacle3-1';
				break;
		}
		sprite = game.add.sprite(x, y, textureName);
		sprite.name = 'obstacle';
		sprite.body.customSeparateX = true;
		sprite.body.immovable = true;
		sprite.y -= (sprite.height/2);
		sprite.body.setSize(sprite.width, sprite.height / 2, 0, (sprite.height / 2)/2);
		this.obstaclesGroup.add(sprite);
		this.obstacles.push(sprite);
	},

	// Retorna o total da largura que está sem plataformas.
	getEmptyWidth: function()
	{
		return game.width - (this.nextX + this.platformsGroup.x);
	},

	// Função de enterFrame
	update: function()
	{
    worldVelocity += 0.001;
		this.platformsGroup.x -= worldVelocity;
		this.obstaclesGroup.x -= worldVelocity;

		while(this.getEmptyWidth() > (game.width * -.5))
		{
			this.insertGround();
		}

		for(var i = 0; i < this.grounds.length; ++i)
		{
			var ground = this.grounds[i];
			if(ground != null && (ground.x + ground.width) < (this.platformsGroup.x * -1))
			{
				this.platformsGroup.remove(ground);
				ground.body.setSize(0, 0, 0, 0);
				ground.kill();
				ground = null;
			}
		}

		for(var i = 0; i < this.obstacles.length; ++i)
		{
			var obstacle = this.obstacles[i];

			if(obstacle != null && (obstacle.x + obstacle.width) < (this.obstaclesGroup.x * -1))
			{
				this.obstaclesGroup.remove(obstacle);
				obstacle.body.setSize(0, 0, 0, 0);
				obstacle.kill();
				obstacle = null;
			}
		}
	},

	debugBoundingBoxes: function() {
		for(var i = 0; i < this.grounds.length; ++i)
		{
			var ground = this.grounds[i];
			if(ground)
			{
				game.debug.renderRectangle(ground.body);
			}
		}
		for(var i = 0; i < this.obstacles.length; ++i)
		{
			var obstacle = this.obstacles[i];
			if(obstacle)
			{
				game.debug.renderRectangle(obstacle.body);
			}
		}
	},

	obstacleCollided: function(s1, s2)
	{
		if(s2.alive)
		{
      s2.alive = false;
			player.kill();
		}
	},

	platformCollided: function(s1, s2)
	{
		//console.log('#### GROUND');
	}
};
