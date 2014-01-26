/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.NoiseFilter = function (game) {

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

    this.uniforms.amount = { type: '1f', value: 0 };
    this.uniforms.time = { type: '1f', value: 0 };
    this.uniforms.seedR = { type: '2f', value: { x: 0, y: 0 } };
    this.uniforms.seedG = { type: '2f', value: { x: 0, y: 0 } };
    this.uniforms.seedB = { type: '2f', value: { x: 0, y: 0 } };

    // this.vextexSrc = [
    //   "uniform float time;",
    //   "varying vec3 v_texCoord3D;",
    //   "void main( void )",
    //   "{",
    //     "gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;",
    //     "v_texCoord3D = gl_Vertex.xyz;",
    //   "}"
    // ];

    //  The fragment shader source
    this.fragmentSrc = [
        "precision mediump float;",
        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",
        "uniform float amount;",
        "uniform float time;",

        "float rand(vec2 co){",
          "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
        "}",

        "void main(void) {",
            "gl_FragColor = texture2D(uSampler, vTextureCoord);",
            "gl_FragColor.r += rand(gl_FragColor.rg * time) / 10.0;",
            "gl_FragColor.g += rand(gl_FragColor.gr * time + 1000.0) / 10.0;",
            "gl_FragColor.b += rand(gl_FragColor.gb * time + 3000.0) / 10.0;",
            // "gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), rand(amount));",
        "}"
    ];

};

Phaser.Filter.NoiseFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.NoiseFilter.prototype.constructor = Phaser.Filter.NoiseFilter;

Phaser.Filter.NoiseFilter.prototype.init = function (width, height) {
    this.setResolution(width, height);
}

Object.defineProperty(Phaser.Filter.NoiseFilter.prototype, 'time', {
    get: function() {
        return this.uniforms.time.value;
    },
    set: function(value) {
        this.uniforms.time.value = value;
    }
});


Object.defineProperty(Phaser.Filter.NoiseFilter.prototype, 'amount', {
    get: function() {
        return this.uniforms.amount.value;
    },
    set: function(value) {
        this.uniforms.amount.value = value;
    }
});

