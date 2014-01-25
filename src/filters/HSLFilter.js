/**
* A sample demonstrating how to create new Phaser Filters.
*/
Phaser.Filter.HSLFilter = function (game) {

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

    this.uniforms.hue = { type: '1f', value: 0.5 };
    this.uniforms.saturation = { type: '1f', value: 0.5 };
    this.uniforms.lightness = { type: '1f', value: 0.5 };

    //  The fragment shader source
    this.fragmentSrc = [
      "precision mediump float;",

      "uniform float hue;",
      "uniform float saturation;",
      "uniform float lightness;",

      "vec3 rgb2hsv(vec3 c)",
      "{",
        "vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);",
        "vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));",
        "vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));",

        "float d = q.x - min(q.w, q.y);",
        "float e = 1.0e-10;",
        "return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);",
      "}",

      "vec3 hsv2rgb(vec3 c)",
      "{",
        "vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);",
        "vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
        "return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
      "}",

      "void main() {",
        "vec4 textureColor = texture2D(sTexture, vTextureCoord);",
        "vec3 fragRGB = textureColor.rgb;",
        "vec3 fragHSV = rgb2hsv(fragRGB);",
        "float h = vHSV.x / 360.0;",
        "fragHSV.x *= h;",
        "fragHSV.yz *= vHSV.yz;",
        "fragHSV.x = mod(fragHSV.x, 1.0);",
        "fragHSV.y = mod(fragHSV.y, 1.0);",
        "fragHSV.z = mod(fragHSV.z, 1.0);",
        "fragRGB = hsv2rgb(fragHSV);",
        "gl_FragColor = vec4(hsv2rgb(fragHSV), textureColor.w);",
      "}"

    ];

};

Phaser.Filter.HSLFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.HSLFilter.prototype.constructor = Phaser.Filter.HSLFilter;

Phaser.Filter.HSLFilter.prototype.init = function (width, height, gray) {
    if (typeof gray == 'undefined') { gray = 0.5; }
    this.setResolution(width, height);
};

Object.defineProperty(Phaser.Filter.HSLFilter.prototype, 'hue', {
    get: function() {
        return this.uniforms.hue.value;
    },
    set: function(value) {
        this.uniforms.hue.value = value;
    }
});

Object.defineProperty(Phaser.Filter.HSLFilter.prototype, 'saturation', {
    get: function() {
        return this.uniforms.saturation.value;
    },
    set: function(value) {
        this.uniforms.saturation.value = value;
    }
});

Object.defineProperty(Phaser.Filter.HSLFilter.prototype, 'lightness', {
    get: function() {
        return this.uniforms.lightness.value;
    },
    set: function(value) {
        this.uniforms.lightness.value = value;
    }
});

