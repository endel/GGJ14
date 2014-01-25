var offsetY = 17;
// FOR THIS I WILL NOT USE TILESPRITES TO DO THE PARALLAX BECAUSE OF THE KNOW BUG IN WEBGL THAT MAKES TILESPRITES TO TICKLE
var parallax = {

	group:null,
	a:null,
	ar:{

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
	init:function(){
		this.group = game.add.group();

    	for(var x in this.ar){

    		this.ar[x].instances.push(this.group.create(0, this.ar[x].y, x));
    		this.ar[x].instances[0].body.immovable = true;
    		this.ar[x].instances[0].filters = filters.all;

    		if(this.ar[x].xRatio > 0){
    			this.ar[x].instances.push(this.group.create(this.ar[x].width, this.ar[x].y, x));
    			this.ar[x].instances[1].body.immovable = true;
          this.ar[x].instances[1].filters = filters.all;
    		}

    	}

	},

	update:function(){

		for(var x in this.ar){
			if(this.ar[x].xRatio <= 0) continue;
			for(var y in this.ar[x].instances){
				var altY = (y==0)?1:0;

				if(this.ar[x].instances[y].body.x < -this.ar[x].width)
					this.ar[x].instances[y].body.x = this.ar[x].instances[altY].body.x + this.ar[x].width;

    			this.ar[x].instances[y].body.velocity.x = -worldVelocity*this.ar[x].xRatio;

			}

    	}
	}

}
