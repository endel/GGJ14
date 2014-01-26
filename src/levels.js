var offsetY = 17;
var levels = {

	bars: [],
	actualGroup: null,
	pointsLabel: null,
	group1:{

		'dia-sky':{
			y:0,
			width:4000,
			xRatio:0	,
			instances:[]
		},

		'dia-mountain-lvl-3':{
			y:offsetY+85,
			width:4000,
			xRatio:1	,
			instances:[]
		},

// 		'dia-cloud-front':{
// 			y:offsetY+0,
// 			width:4000,
// 			xRatio:.15	,
// 			instances:[]
// 		},

		'dia-mountain-lvl-2':{
			y:offsetY+115,
			width:4000,
			xRatio:2	,
			instances:[]
		},

		'dia-mountain-lvl-1':{
			y:offsetY+200,
			width:4000,
			xRatio:3	,
			instances:[]
		},

		'dia-lake-forest':{
			y:offsetY+259,
			width:4000,
			xRatio:5	,
			instances:[]
		},

	},

	group2:{

		'tarde-sky':{
			y:0,
			width:4000,
			xRatio:0	,
			instances:[]
		},

		'tarde-mountain-lvl-3':{
			y:offsetY+85,
			width:4000,
			xRatio:.1	,
			instances:[]
		},

// 		'tarde-cloud-front':{
// 			y:offsetY+0,
// 			width:4000,
// 			xRatio:.15	,
// 			instances:[]
// 		},

		'tarde-mountain-lvl-2':{
			y:offsetY+115,
			width:4000,
			xRatio:.2	,
			instances:[]
		},

		'tarde-mountain-lvl-1':{
			y:offsetY+200,
			width:4000,
			xRatio:.3	,
			instances:[]
		},

		'tarde-lake-forest':{
			y:offsetY+259,
			width:4000,
			xRatio:.5	,
			instances:[]
		},

	},

	group3:{

		'noite-sky':{
			y:0,
			width:4000,
			xRatio:0	,
			instances:[]
		},

		'noite-mountain-lvl-3':{
			y:offsetY+85,
			width:4000,
			xRatio:.5	,
			instances:[]
		},

// 		'noite-cloud-front':{
// 			y:offsetY+0,
// 			width:4000,
// 			xRatio:.15	,
// 			instances:[]
// 		},

		'noite-mountain-lvl-2':{
			y:offsetY+115,
			width:4000,
			xRatio:.6	,
			instances:[]
		},

		'noite-mountain-lvl-1':{
			y:offsetY+200,
			width:4000,
			xRatio:.7	,
			instances:[]
		},

		'noite-lake-forest':{
			y:offsetY+259,
			width:4000,
			xRatio:.9	,
			instances:[]
		},

	},

	init: function(level){
		console.log("level control");

		switch(level){
			case 1:
				this.actualGroup = this.group1;
			break;

			case 2:
				this.actualGroup = this.group2;
			break;

			case 3:
				this.actualGroup = this.group3;
			break;
		}

		parallax.init(this.actualGroup);
	},

	barsUpdate: function()
	{
		var bar1 = this.bars[0],
			bar2 = this.bars[1],
			bar3 = this.bars[2];

		bar1.setEnergy(player.energies.blue);
		bar2.setEnergy(player.energies.green);
		bar3.setEnergy(player.energies.red);

		if(bar1.getEnergy() == 0 || bar1.getEnergy() == 1)
		{
			bar1.setEnable(false);
		}
		else
		{
			bar1.setEnable(true);
		}

		if(bar2.getEnergy() == 0 || bar2.getEnergy() == 1)
		{
			bar2.setEnable(false);
		}
		else
		{
			bar2.setEnable(true);
		}

		if(bar3.getEnergy() == 0 || bar3.getEnergy() == 1)
		{
			bar3.setEnable(false);
		}
		else
		{
			bar3.setEnable(true);
		}
	},

	buildBars: function()
	{
		var i, total = 3, obj;

		for(i = 0; i < total; ++i)
		{
			obj = function()
			{
				var maxWidth, group, background, bar, emptyBar, energy;

				maxWidth = 185;
				energy = 0;

				group = game.add.group();
				group.x = 10;
				group.y = (10 + (30 * i));

				background = game.add.sprite(0, 0, 'backgroundBar');
				group.add(background);

				bar = game.add.sprite(6, 5, 'bar' + (i + 1));
				bar.width = 0;
				group.add(bar);

				emptyBar = game.add.sprite(6, 5, 'emptyBar');
				emptyBar.width = maxWidth;
				group.add(emptyBar);

				setEnergy = function(i)
				{
					energy = i;
					energy = (energy > 1)?1:energy;

					var width = Math.ceil(energy * maxWidth / 1);
					bar.width = width;

					emptyBar.x = bar.x + bar.width;
					emptyBar.width = maxWidth - width;
				}

				getEnergy = function()
				{
					return energy;
				}

				setEnable = function(b)
				{
					if(b == true)
					{
						//group.alpha = 1;
					}
					else
					{
						//group.alpha = .5;
					}
				}

				setEnable(false);

				return {
					setEnable: setEnable,
					setEnergy: setEnergy,
					getEnergy: getEnergy
				}
			};

			this.bars.push(obj());
		}

		this.pointsLabel = function()
		{
			var style, label, total;

			style = {font: '20px "fippsregular"', fill: '#000', align: 'left'};

			total = 0;

			label = game.add.text(10, 150, String(total), style);

		}

		this.pointsLabel();
	},

	// create: function(){

	// },

	changeLevel: function(level){

		switch(level){
			case 1:
				this.actualGroup = this.group1;
			break;

			case 2:
				this.actualGroup = this.group2;
			break;

			case 3:
				this.actualGroup = this.group3;
			break;
		}

		parallax.replaceGroupChild(this.actualGroup);

	},

	objectCollected: function(obj){
		console.log(obj)
	}
};
