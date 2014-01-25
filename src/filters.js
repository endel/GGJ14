var filters = {
  all: [],

  init: function() {
    // init filters
    filters.grayscale = game.add.filter('GrayFilter', game.width, game.height);
    filters.color_reducer = game.add.filter('ColorReducerFilter', game.width, game.height);

    this.all = [filters.grayscale, filters.color_reducer];
    // this.all = [];
  },

  update: function() {
    filters.grayscale.update();
    filters.color_reducer.update();
  }

};
