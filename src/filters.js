var filters = {
  all: [],

  load: function() {
    game.load.script('gray-filter', 'src/filters/GrayFilter.js');
    game.load.script('color-reducer-filter', 'src/filters/ColorReducerFilter.js');
    game.load.script('noise-filter', 'src/filters/NoiseFilter.js');
    // game.load.script('rgb-split', 'src/filters/RGBSplitFilter.js');
  },

  init: function() {
    // init filters
    filters.grayscale = game.add.filter('GrayFilter', game.width, game.height);
    filters.color_reducer = game.add.filter('ColorReducerFilter', game.width, game.height);
    filters.noise = game.add.filter('NoiseFilter', game.width, game.height);
    // filters.rgb_split = game.add.filter('RGBSplitFilter', game.width, game.height);

    // this.all = [filters.grayscale, filters.color_reducer];
    // this.all = [filters.grayscale, filters.color_reducer, filters.rgb_split];
    this.all = [filters.grayscale, filters.color_reducer, filters.noise];
    // this.all = [];
  },

  update: function() {
    filters.grayscale.update();
    filters.color_reducer.update();
    filters.noise.update();
    // filters.rgb_split.update();
  }

};
