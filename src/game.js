var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', {
  create: create
});

function create() {
    var t = game.add.text(game.world.centerX-300, 0, "hello game jam", { font: "65px Arial", fill: "#ff0044", align: "center" });
}
