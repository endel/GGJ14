var game = new Phaser.Game(1136, 640, Phaser.WEBGL, '', { preload: preload, create: create, update: update });
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
    
    //dia
    game.load.image('dia-mountain-lvl-1', 'assets/background/dia/mountain-lvl-1.png');
    game.load.image('dia-mountain-lvl-2', 'assets/background/dia/mountain-lvl-2.png');
    game.load.image('dia-mountain-lvl-3', 'assets/background/dia/mountain-lvl-3.png');
    game.load.image('dia-lake-forest', 'assets/background/dia/lake-forest.png');
    game.load.image('dia-sky', 'assets/background/dia/sky.png');
    game.load.image('dia-cloud-front', 'assets/background/dia/cloud-front.png');

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
}

function create() {
    game.level = 1;

    cursors = game.input.keyboard.createCursorKeys();

    // filters.init();
    levels.init(game.level);
    // parallax.init();
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


    // filters.update();
    parallax.update();
    player.update();

    //ground.body.velocity.x = -worldVelocity;
    platforms.refreshPosition();
    collector.refreshPosition();

    //filter.update();

    // PROTOTYPE SPEEDUP -- REMOVE WHEN CORRECT SPEEDUP IMPLEMENTED --
    countdownToSpeedUp--;
    if(countdownToSpeedUp <= 0) {
        countdownToSpeedUp = 100;
        worldVelocity++;
    }
}
