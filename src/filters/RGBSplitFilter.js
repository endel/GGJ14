/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.RGBSplitFilter = function (game) {

    Phaser.Filter.call(this, game);

    /**
    * By default the following uniforms are already created and available:
    *
    * uniform float time - The current number of elapsed milliseconds in the game.
    * uniform vec3 resolution - The dimensions of the filter. Can be set via setSize(width, height)
    * uniform vec4 mouse - The mouse / touch coordinates taken from the pointer given to the update function, if any.
    * uniform sampler2D uSampler - The current texture (usually the texture of the Sprite the shader is bound to)
    *
    * Add in any additional vars you require. Here is a new one called 'wobble' that is a 2f:
    *
    * this.uniforms.wobble = { type: '2f', value: { x: 0, y: 0 }};
    *
    * The supported types are: 1f, 1fv, 1i, 2f, 2fv, 2i, 2iv, 3f, 3fv, 3i, 3iv, 4f, 4fv, 4i, 4iv, mat2, mat3, mat4 and sampler2D.
    */

    this.uniforms.red = {type: '2f', value: {x:20, y:20}};
    this.uniforms.green = {type: '2f', value: {x:-20, y:20}};
    this.uniforms.blue = {type: '2f', value: {x:20, y:-20}};
    this.uniforms.dimensions = {type: '4fv', value:[0,0,0,0]};

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        // 'varying vec4 vColor;',
        'uniform vec2 red;',
        'uniform vec2 green;',
        'uniform vec2 blue;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',

        'void main(void) {',
          'gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;',
          'gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;',
          'gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;',
          'gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
        '}'
    ];

};

Phaser.Filter.RGBSplitFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.RGBSplitFilter.prototype.constructor = Phaser.Filter.RGBSplitFilter;

Phaser.Filter.RGBSplitFilter.prototype.init = function (width, height) {
    this.setResolution(width, height);
}

Object.defineProperty(Phaser.Filter.RGBSplitFilter.prototype, 'angle', {
    get: function() {
        return this.uniforms.blur.value / (1/7000);
    },
    set: function(value) {
        //this.padding = value;
        this.uniforms.blur.value = (1/7000) * value;
    }
});
