/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.ColorReducerFilter = function (game) {

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

    this.uniforms.r = { type: '1f', value: 1 };
    this.uniforms.g = { type: '1f', value: 1 };
    this.uniforms.b = { type: '1f', value: 1 };

    //  The fragment shader source
    this.fragmentSrc = [
        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",
        "uniform float r;",
        "uniform float g;",
        "uniform float b;",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.r = gl_FragColor.r * r;",
            "gl_FragColor.g = gl_FragColor.g * g;",
            "gl_FragColor.b = gl_FragColor.b * b;",
        "}"
    ];

};

Phaser.Filter.ColorReducerFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.ColorReducerFilter.prototype.constructor = Phaser.Filter.ColorReducerFilter;

Phaser.Filter.ColorReducerFilter.prototype.init = function (width, height) {
    this.setResolution(width, height);
};

Object.defineProperty(Phaser.Filter.ColorReducerFilter.prototype, 'r', {
    get: function() {
        return this.uniforms.r.value;
    },
    set: function(value) {
        this.uniforms.r.value = value;
    }
});

Object.defineProperty(Phaser.Filter.ColorReducerFilter.prototype, 'g', {
    get: function() {
        return this.uniforms.g.value;
    },
    set: function(value) {
        this.uniforms.g.value = value;
    }
});

Object.defineProperty(Phaser.Filter.ColorReducerFilter.prototype, 'b', {
    get: function() {
        return this.uniforms.b.value;
    },
    set: function(value) {
        this.uniforms.b.value = value;
    }
});

