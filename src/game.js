var filter;

var game = new Phaser.Game(800, 600, Phaser.WEBGL, '', {
  preload: preload,
  create: create,
  update: update
});

function preload() {
  game.load.image('doge', 'assets/doge.png');
  game.load.script('filter', 'src/filters/GrayFilter.js');
  // game.load.script('filter', 'src/filters/HueRotate.js');
  // game.load.script('filter', 'src/filters/LightBeam.js');
}

function create() {
  var doge = game.add.sprite(game.world.centerX, game.world.centerY, 'doge');
  doge.anchor.setTo(0.5,0.5);

  filter = game.add.filter('GrayFilter', 800, 600);
  doge.filters = [filter];
}

function update() {
  filter.update();
}
