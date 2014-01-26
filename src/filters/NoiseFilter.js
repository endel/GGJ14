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
        "uniform float resolution;",

        "float remap(float value, float inputMin, float inputMax, float outputMin, float outputMax)",
        "{",
            "return (value - inputMin) * ((outputMax - outputMin) / (inputMax - inputMin)) + outputMin;",
        "}",

        "float rand(vec2 n, float time)",
        "{",
          "return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453 + time);",
        "}",

        "float f1(float x)",
        "{",
          "return -4.0 * pow(x - 0.5, 2.0) + 1.0;",
        "}",

        "void main(void)",
        "{",
          "vec2 uv = gl_FragCoord.xy / resolution.xy;",

          "float wide = resolution.x / resolution.y;",
          "float high = 1.0;",

          "vec2 position = vec2(uv.x * wide, uv.y);",

          "float greenness = 0.4;",
          "vec4 coloring = vec4(1.0 - greenness, 1.0, 1.0 - greenness, 1.0);",

          "float noise = rand(uv * vec2(0.1, 1.0), time * 5.0);",
          "float noiseColor = 1.0 - (1.0 - noise) * 0.3;",
          "vec4 noising = vec4(noiseColor, noiseColor, noiseColor, 1.0);",

          "float warpLine = fract(-time * 0.5);",

          "float warpLen = 0.1;",
          "float warpArg01 = remap(clamp((position.y - warpLine) - warpLen * 0.5, 0.0, warpLen), 0.0, warpLen, 0.0, 1.0);",
          "float offset = sin(warpArg01 * 10.0)  * f1(warpArg01);",

          "vec4 lineNoise = vec4(1.0, 1.0, 1.0, 1.0);",
          "if(abs(uv.y - fract(-time * 19.0)) < 0.0005)",
          "{",
            "lineNoise = vec4(0.5, 0.5, 0.5, 1.0);",
          "}",

          "vec4 base = texture2D(uSampler, uv + vec2(offset * 0.02, 0.0));",
// mask *
          "gl_FragColor = base * coloring * noising * lineNoise;",
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

