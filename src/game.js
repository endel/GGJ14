// var game = new Phaser.Game(1136, 640, Phaser.WEBGL, '', {
var game = new Phaser.Game(1136, 640, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
    render: render,
    debug: true
});
var cursors;

var worldVelocity = 2;

function preload(a) {
    // init
    filters.load();

    // sounds
    game.load.audio('sound-base', 'assets/songs/base.mp3');
    game.load.audio('sound-basssynths', 'assets/songs/basssynths.mp3');
    game.load.audio('sound-highvoices', 'assets/songs/highvoices.mp3');

    // spritesheets
    game.load.atlas('player', 'assets/player.png', 'assets/player.json');

    // sounds
    // game.load.atlas('energy-blue', 'assets/items/energy-blue.png', 'assets/items/energy-blue.json');

    // energies
    game.load.atlas('energy-blue', 'assets/items/energy-blue.png', 'assets/items/energy-blue.json');
    game.load.atlas('point-blue', 'assets/items/point-blue.png', 'assets/items/point-blue.json');
    game.load.atlas('energy-green', 'assets/items/energy-green.png', 'assets/items/energy-green.json');
    game.load.atlas('point-green', 'assets/items/point-green.png', 'assets/items/point-green.json');
    game.load.atlas('energy-red', 'assets/items/energy-red.png', 'assets/items/energy-red.json');
    game.load.atlas('point-red', 'assets/items/point-red.png', 'assets/items/point-red.json');

    //dia
    game.load.image('dia-mountain-lvl-1', 'assets/background/dia/mountain-lvl-1.png');
    game.load.image('dia-mountain-lvl-2', 'assets/background/dia/mountain-lvl-2.png');
    game.load.image('dia-mountain-lvl-3', 'assets/background/dia/mountain-lvl-3.png');
    game.load.image('dia-lake-forest', 'assets/background/dia/lake-forest.png');
    game.load.image('dia-sky', 'assets/background/dia/sky.png');

    //tarde
    game.load.image('tarde-mountain-lvl-1', 'assets/background/tarde/mountain-lvl-1.png');
    game.load.image('tarde-mountain-lvl-2', 'assets/background/tarde/mountain-lvl-2.png');
    game.load.image('tarde-mountain-lvl-3', 'assets/background/tarde/mountain-lvl-3.png');
    game.load.image('tarde-lake-forest', 'assets/background/tarde/lake-forest.png');
    game.load.image('tarde-sky', 'assets/background/tarde/sky.png');
    game.load.image('tarde-cloud-front', 'assets/background/tarde/cloud-front.png');

    //noite
    game.load.image('noite-mountain-lvl-1', 'assets/background/noite/mountain-lvl-1.png');
    game.load.image('noite-mountain-lvl-2', 'assets/background/noite/mountain-lvl-2.png');
    game.load.image('noite-mountain-lvl-3', 'assets/background/noite/mountain-lvl-3.png');
    game.load.image('noite-lake-forest', 'assets/background/noite/lake-forest.png');
    game.load.image('noite-sky', 'assets/background/noite/sky.png');
    game.load.image('noite-cloud-front', 'assets/background/noite/cloud-front.png');

    // bars
    game.load.image('bar1', 'assets/bars/bar1.gif');
    game.load.image('bar2', 'assets/bars/bar2.gif');
    game.load.image('bar3', 'assets/bars/bar3.gif');
    game.load.image('emptyBar', 'assets/bars/emptyBar.gif');
    game.load.image('backgroundBar', 'assets/bars/background.png');

    // platform
    game.load.image('platform1-1', 'assets/platforms/platform1-1.png');
    game.load.image('platform1-2', 'assets/platforms/platform1-2.png');
    game.load.image('platform1-3', 'assets/platforms/platform1-3.png');
    game.load.image('platform2-1', 'assets/platforms/platform2-1.png');
    game.load.image('platform2-2', 'assets/platforms/platform2-2.png');
    game.load.image('platform2-3', 'assets/platforms/platform2-3.png');
    game.load.image('platform3-1', 'assets/platforms/platform3-1.png');
    game.load.image('platform3-2', 'assets/platforms/platform3-2.png');
    game.load.image('platform3-3', 'assets/platforms/platform3-3.png');
    game.load.image('largeObstacle1', 'assets/platforms/largeObstacle1.png');
    game.load.image('largeObstacle3-1', 'assets/platforms/largeObstacle3-1.png');
    game.load.image('largeObstacle3-2', 'assets/platforms/largeObstacle3-2.png');
    game.load.image('smallObstacle1', 'assets/platforms/smallObstacle1.png');
    game.load.image('smallObstacle3-1', 'assets/platforms/smallObstacle3-1.png');
    game.load.image('smallObstacle3-2', 'assets/platforms/smallObstacle3-2.png');

    //player
    game.load.spritesheet('cora', 'assets/cora-run.png', 70, 100);
}

function create() {
    game.level = 1;

    cursors = game.input.keyboard.createCursorKeys();

    filters.init();
    levels.init(game.level);
    platforms.init();
    player.init();

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
    game.physics.collide(player.instance, platforms.platformsGroup, platforms.platformCollided);
    game.physics.overlap(player.instance, platforms.obstaclesGroup, platforms.obstacleCollided);

    filters.update();
    parallax.update();

    //ground.body.velocity.x = -worldVelocity;
    platforms.update();
    collector.update();
    player.update();

}

function render() {
    platforms.debugBoundingBoxes();
}

