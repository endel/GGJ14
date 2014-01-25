var game = new Phaser.Game(900, 640, Phaser.WEBGL, '', { preload: preload, create: create, update: update });
var cursors;
var filters = {};

var worldVelocity = 2;


function preload(a) {
    game.load.script('gray-filter', 'src/filters/GrayFilter.js');
    game.load.script('color-reducer-filter', 'src/filters/ColorReducerFilter.js');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

function create() {
    game.level = 1;

    var t = game.add.text(game.world.centerX-300, 0, "teste", { font: "65px Arial", fill: "#ff0044", align: "center" });
    cursors = game.input.keyboard.createCursorKeys();

    // init filters
    filters.grayscale = game.add.filter('GrayFilter', game.width, game.height);
    filters.color_reducer = game.add.filter('ColorReducerFilter', game.width, game.height);

    player.init();
    platforms.init(game);




    // platforms.group = game.add.group();
    /*ground = platforms.group.create(-50, game.world.height - 64, 'ground');
    ground.body.immovable = true;*/


    /*var doge = game.add.sprite(game.world.centerX, game.world.centerY, 'doge');
    doge.anchor.setTo(0.5,0.5);

    doge.filters = [filter];*/
}

function restart() {
}

function update() {

    // always on top
    game.physics.collide(player.instance, platforms.group);

    filters.grayscale.update();
    filters.color_reducer.update();

    player.update();

    //ground.body.velocity.x = -worldVelocity;
    platforms.refreshPosition();

    //filter.update();




}
