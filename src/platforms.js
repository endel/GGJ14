var platforms = {

	// array de obstaculos
	obstacles: [],

	//
	obstacleNames: [],

	//
	collidedObstacleNames: [],

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

	// posição y da última plataforma adicionada
	prevPlatformTileY: 0,

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

		if(this.prevPlatformTileY != 0)
		{
			if(tileY < this.prevPlatformTileY && tileY < (this.prevPlatformTileY - 1))
			{
				tileY = (this.prevPlatformTileY - 1);
			}
		}

		if(this.grounds == 0)
		{
			tileSize = 12;
		}

		this.prevPlatformTileY = tileY;

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

		if(this.grounds.length == 0)
		{
			// funciona na máquina do Anderson, mas na minha não
			//player.instance.y = tileY - player.instance.height;
			this.nextX += currWidth;
		}
		else
		{
			this.addItems(currX, tileY, currWidth);
			this.addObstacles(currX, tileY, currWidth);
			this.nextX += currWidth + this.tileInterval;
		}
		//this.grounds.push(ground);
		this.grounds.push(visibleGround1);
		this.grounds.push(visibleGround2);
		this.grounds.push(visibleGround3);

	},

	addItems: function(platformX, platformY, platformWidth)
	{
		collector.add(1, 'point', (platformX + (platformWidth / 2)) - 100 , platformY);
		collector.add(1, 'point', (platformX + (platformWidth / 2))       , platformY);
		collector.add(1, 'point', (platformX + (platformWidth / 2)) + 100 , platformY);
		collector.add(1, 'energy', (platformX + (platformWidth / 2))      , platformY - 100);
	},

	addObstacles: function(platformX, platformY, platformWidth)
	{
		//this.insertObstacle((platformX + (platformWidth / 2)), platformY, 'large');

		this.insertObstacleGroup(platformX, platformY, 'large', 2);
	},

	insertObstacleGroup: function(x, y, size, type)
	{
		var sprite1, sprite2, sprite3, sprite4, sprite5, sprite6;

		type = (type == undefined)?1:type;

		switch(type)
		{
			case 1:
				sprite1 = this.insertObstacle(x, y, size);
				sprite2 = this.insertObstacle(x + sprite1.width + 10, y, size, sprite1.name);
				sprite3 = this.insertObstacle(x + ((sprite1.width + 10) /2 ), y - 25, size, sprite1.name);
				break;
			case 2:
				sprite1 = this.insertObstacle(x, y, size);
				sprite2 = this.insertObstacle(x + sprite1.width + 10, y, size, sprite1.name);
				sprite3 = this.insertObstacle(sprite2.x + sprite2.width + 10, y, size, sprite1.name);
				sprite4 = this.insertObstacle(x + ((sprite1.width + 10) /2 ), y - 25, size, sprite1.name);
				sprite5 = this.insertObstacle(sprite4.x + sprite1.width + 10, y - 25, size, sprite1.name);
				break;
		}
	},

	insertObstacle: function(x, y, size, name)
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
		sprite.name = (name)?name:'obstacle' + this.obstacleNames.length;
		sprite.body.customSeparateX = true;
		sprite.body.immovable = true;
		sprite.y -= (sprite.height/2);
		sprite.body.setSize(sprite.width, sprite.height / 2, 0, (sprite.height / 2)/2);
		this.obstaclesGroup.add(sprite);
		this.obstacles.push(sprite);

		if(this.obstacleNames.indexOf(sprite.name) == -1)
		{
			this.obstacleNames.push(sprite.name);
		}

		return sprite;
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
			if(platforms.collidedObstacleNames.length == 0 || platforms.collidedObstacleNames.indexOf(s2.name) == -1)
			{
				platforms.collidedObstacleNames.push(s2.name);
	      		s2.alive = false;
				player.kill();
			}
		}
	},

	platformCollided: function(s1, s2)
	{
		//console.log('#### GROUND');
	}
};
