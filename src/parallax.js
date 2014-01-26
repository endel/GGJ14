// var offsetY = 17;
// FOR THIS I WILL NOT USE TILESPRITES TO DO THE PARALLAX BECAUSE OF THE KNOW BUG IN WEBGL THAT MAKES TILESPRITES TO TICKLE
var parallax = {

	group: null,
	newGroup: null,
	// a:null,
	actualGroup: null,
// 	ar:{
// 		'dia-sky':{
// 			y:0,
// 			width:4000,
// 			xRatio:0	,
// 			instances:[]
// 		},
// 		'dia-mountain-lvl-3':{
// 			y:offsetY+85,
// 			width:4000,
// 			xRatio:.1	,
// 			instances:[]
// 		},
// 		'dia-cloud-front':{
// 			y:offsetY+0,
// 			width:4000,
// 			xRatio:.15	,
// 			instances:[]
// 		},
// 		'dia-mountain-lvl-2':{
// 			y:offsetY+115,
// 			width:4000,
// 			xRatio:.2	,
// 			instances:[]
// 		},
// 		'dia-mountain-lvl-1':{
// 			y:offsetY+200,
// 			width:4000,
// 			xRatio:.3	,
// 			instances:[]
// 		},
// 		'dia-lake-forest':{
// 			y:offsetY+259,
// 			width:4000,
// 			xRatio:.5	,
// 			instances:[]
// 		},
// 	},

	init:function(group){
		this.group = game.add.group();
		this.actualGroup = group;

    	for(var x in group){

    		group[x].instances.push(this.group.create(0, group[x].y, x));
    		group[x].instances[0].body.immovable = true;

    		if(group[x].xRatio > 0){
    			group[x].instances.push(this.group.create(group[x].width, group[x].y, x));
    			group[x].instances[1].body.immovable = true;
    		}

    	}

    	// debugger;

	},

	replaceGroupChild: function(newChild){
		this.newGroup = game.add.group();
		this.actualGroup = newChild;

    	for(var x in newChild){

    		newChild[x].instances.push(this.group.create(0, newChild[x].y, x));
    		newChild[x].instances[0].body.immovable = true;
    		// newChild[x].instances[0].filters = filters.all;

    		if(newChild[x].xRatio > 0){
    			newChild[x].instances.push(this.group.create(newChild[x].width, newChild[x].y, x));
    			newChild[x].instances[1].body.immovable = true;
          // this.ar[x].instances[1].filters = filters.all;
    		}

    	}

	},

	update:function(){
		for(var x in this.actualGroup){
			if(this.actualGroup[x].xRatio <= 0) continue;
			for(var y in this.actualGroup[x].instances){
				var altY = (y==0)?1:0;

				if(this.actualGroup[x].instances[y].body.x < -this.actualGroup[x].width)
					this.actualGroup[x].instances[y].body.x = this.actualGroup[x].instances[altY].body.x + this.actualGroup[x].width;

    			this.actualGroup[x].instances[y].body.velocity.x = -worldVelocity*this.actualGroup[x].xRatio;

			}

    	}
	}

}
