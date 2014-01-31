var filters = {
  all: [],

  enabled: true,
  // enabled: false,

  load: function() {

    if (this.enabled) {
      game.load.script('gray-filter', 'src/filters/GrayFilter.js');
      game.load.script('color-reducer-filter', 'src/filters/ColorReducerFilter.js');
      game.load.script('noise-filter', 'src/filters/NoiseFilter.js');
      // game.load.script('rgb-split', 'src/filters/RGBSplitFilter.js');
    }
  },

  init: function() {
    if (this.enabled) {
      // init filters
      filters.grayscale = game.add.filter('GrayFilter', game.width, game.height);
      filters.color_reducer = game.add.filter('ColorReducerFilter', game.width, game.height);
      filters.noise = game.add.filter('NoiseFilter', game.width, game.height);
      // filters.rgb_split = game.add.filter('RGBSplitFilter', game.width, game.height);

      filters.grayscale.update = function() {
        this.uniforms.gray.value = 1 - ((player.energies['blue'] + player.energies['green'] + player.energies['red']) / 3);
      };

      filters.color_reducer.update = function() {
        // this.uniforms.r.value = ;
        // this.uniforms.g.value = ;
        // this.uniforms.b.value = ;
      };

      // this.all = [filters.grayscale, filters.color_reducer];
      // this.all = [filters.grayscale, filters.color_reducer, filters.rgb_split];
      this.all = [filters.grayscale, filters.color_reducer, filters.noise];
      // this.all = [];

      // apply filters to entire stage
      game.stage._stage.children[0].filters = filters.all;
    }
  },

  update: function() {
    if (this.enabled) {
      filters.grayscale.update();
      filters.color_reducer.update();
      filters.noise.update();
      // filters.rgb_split.update();
    }
  }

};
