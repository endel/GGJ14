var game = new Phaser.Game(1136, 640, Phaser.WEBGL, '', { preload: preload, create: create, update: update });
var ground;
var cursors;
var filter;

var worldVelocity = 20;


function preload(a) {
    game.load.image('doge', 'assets/doge.png');
    game.load.script('filter', 'src/filters/GrayFilter.js');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('dia-mountain-lvl-1', 'assets/background/dia/mountain-lvl-1.png');
    game.load.image('dia-mountain-lvl-2', 'assets/background/dia/mountain-lvl-2.png');
    game.load.image('dia-mountain-lvl-3', 'assets/background/dia/mountain-lvl-3.png');
    game.load.image('dia-lake-forest', 'assets/background/dia/lake-forest.png');
    game.load.image('dia-sky', 'assets/background/dia/sky.png');
    game.load.image('dia-cloud-front', 'assets/background/dia/cloud-front.png');

    
}
 
function create() {
    game.level = 1;

    var t = game.add.text(game.world.centerX-300, 0, "teste", { font: "65px Arial", fill: "#ff0044", align: "center" });
    cursors = game.input.keyboard.createCursorKeys();

    parallax.init();
    player.init();
    platforms.init(game);

    // platforms.group = game.add.group();
    ground = platforms.group.create(-50, game.world.height - 64, 'ground');
    ground.body.immovable = true;


    /*var doge = game.add.sprite(game.world.centerX, game.world.centerY, 'doge');
    doge.anchor.setTo(0.5,0.5);

    filter = game.add.filter('GrayFilter', 800, 600);
    doge.filters = [filter];*/
}
 
function update() {

    // always on top
    game.physics.collide(player.instance, platforms.group);

    parallax.update();
    player.update();

    ground.body.velocity.x = -worldVelocity;
    platforms.refreshPosition(ground.body.x);

    //filter.update();
	
	


}
