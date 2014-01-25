var game = new Phaser.Game(960, 640, Phaser.WEBGL, '', { preload: preload, create: create, update: update });
var player;
var ground;
var cursor;
var filter;

var worldVelocity = 20;


function preload(a) {
    game.load.image('doge', 'assets/doge.png');
    game.load.script('filter', 'src/filters/GrayFilter.js');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}
 
function create() {
    var t = game.add.text(game.world.centerX-300, 0, "teste", { font: "65px Arial", fill: "#ff0044", align: "center" });
    cursors = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(400, game.world.height - 150, 'dude');
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 6;
    player.body.collideWorldBounds = true;
 	
    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    platforms.group = game.add.group();
    ground = platforms.group.create(0, game.world.height - 64, 'ground');
    ground.body.immovable = true;


    /*var doge = game.add.sprite(game.world.centerX, game.world.centerY, 'doge');
    doge.anchor.setTo(0.5,0.5);

    filter = game.add.filter('GrayFilter', 800, 600);
    doge.filters = [filter];*/
}
 
function update() {

    //game.world.centerX = game.world.centerX - worldVelocity

    /*filter.update();*/
    
	game.physics.collide(player, platforms.group);
	ground.body.velocity.x = -worldVelocity;
	player.body.velocity.x = 0;

    platforms.refreshPosition(ground.body.x);
 
    player.animations.play('right');
 
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}
