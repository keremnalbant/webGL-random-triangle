var gl;
var numPoints = 5000;

window.onload = function init() {
    const canvas = document.querySelector("#glcanvas");
    gl = canvas.getContext("webgl");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertices = [vec2(-1.0, -1.0),
    vec2(0.0, 1.0),
    vec2(1.0, -1.0)];

    var colors = [ vec3(0.0, 0.0, 0.0),
         vec3(1.0, 0.0, 0.0),
         vec3(1.0, 1.0, 0.0),
         vec3(0.0, 1.0, 0.0),
         vec3(0.0, 0.0, 1.0),
         vec3(1.0, 0.0, 1.0),
         vec3(1.0, 1.0, 1.0),
         vec3(0.0, 1.0, 1.0)];

    var u = scale(0.5, add(vertices[0], vertices[1]));
    var v = scale(0.5, add(vertices[0], vertices[2]));
    var p = scale(0.5, add(u, v));
    points = [p];

    for (var i = 1; i < 3; ++i) {
        var j = Math.floor(Math.random() * 3);
        p = scale(0.5, add(points[i - 1], vertices[j]));
        points.push(p);
    }

    console.log(points);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var colorLoc = gl.getUniformLocation(program, "fColor");
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    gl.uniform3fv(colorLoc, flatten(randomColor));

    window.onclick = myFunction;
    function myFunction(){
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    gl.uniform3fv(colorLoc, flatten(randomColor));
    render();
    }

    gl.clearColor(.5, .5, .6, 1.0);

    render();
};

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, numPoints);
}