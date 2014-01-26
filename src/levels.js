var offsetY = 17;
var levels = {

	bars: [],
	actualGroup: null,
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
			xRatio:.1	,
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
			xRatio:.2	,
			instances:[]
		},

		'dia-mountain-lvl-1':{
			y:offsetY+200,
			width:4000,
			xRatio:.3	,
			instances:[]
		},

		'dia-lake-forest':{
			y:offsetY+259,
			width:4000,
			xRatio:.5	,
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
			xRatio:.1	,
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
			xRatio:.2	,
			instances:[]
		},

		'noite-mountain-lvl-1':{
			y:offsetY+200,
			width:4000,
			xRatio:.3	,
			instances:[]
		},

		'noite-lake-forest':{
			y:offsetY+259,
			width:4000,
			xRatio:.5	,
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

		this.buildBars();

		parallax.init(this.actualGroup);
	},

	buildBars: function()
	{
		var i, total = 3, obj;

		for(i = 0; i < total; ++i)
		{
			/*obj = {};
			obj.maxWidth = 185;

			obj.group = game.add.group();
			obj.group.x = 10;
			obj.group.y = (10 + (30 * i));

			obj.background = game.add.sprite(0, 0, 'backgroundBar');
			obj.group.add(obj.background);

			obj.bar = game.add.sprite(6, 5, 'bar' + (i + 1));
			obj.bar.width = 0;
			obj.group.add(obj.bar);

			obj.emptyBar = game.add.sprite(6, 5, 'emptyBar');
			obj.width = obj.maxWidth;
			obj.group.add(obj.maxWidth);*/

			this.bars.push(obj);
		}
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
