var game = new Phaser.Game(1136, 640, Phaser.WEBGL, '', { 
//var game = new Phaser.Game(1136, 640, Phaser.CANVAS, '', { 
    preload: preload, 
    create: create, 
    update: update,
    render: render,
    debug: true
});
var cursors;

var worldVelocity = 2;
var countdownToSpeedUp = 100;

function preload(a) {
    // game.load.script('gray-filter', 'src/filters/GrayFilter.js');
    // game.load.script('color-reducer-filter', 'src/filters/ColorReducerFilter.js');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/cora-run.png', 70, 100 );
    game.load.image('dia-mountain-lvl-1', 'assets/background/dia/mountain-lvl-1.png');
    game.load.image('dia-mountain-lvl-2', 'assets/background/dia/mountain-lvl-2.png');
    game.load.image('dia-mountain-lvl-3', 'assets/background/dia/mountain-lvl-3.png');
    game.load.image('dia-lake-forest', 'assets/background/dia/lake-forest.png');
    game.load.image('dia-sky', 'assets/background/dia/sky.png');
    game.load.image('dia-cloud-front', 'assets/background/dia/cloud-front.png');

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
}

function create() {
    game.level = 1;

    cursors = game.input.keyboard.createCursorKeys();

    // filters.init();
    levels.init(game.level);
    platforms.init();
    player.init();
    // parallax.init();


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
    //game.physics.collide(player.instance, platforms.platformsGroup);


    // filters.update();
    parallax.update();
    player.update();

    //ground.body.velocity.x = -worldVelocity;
    platforms.refreshPosition();
    collector.refreshPosition();

    //filter.update();

    // PROTOTYPE SPEEDUP -- REMOVE WHEN CORRECT SPEEDUP IMPLEMENTED --
    /*countdownToSpeedUp--;
    if(countdownToSpeedUp <= 0) {
        countdownToSpeedUp = 100;
        worldVelocity++;
    }*/
}

function render() {
    platforms.debugBoundingBoxes();
}
