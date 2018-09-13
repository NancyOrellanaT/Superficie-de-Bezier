let camera, scene, renderer;
let cameraControls, effectController;
let clock = new THREE.Clock();
let axes = true;

var puntos = [];
var colores = [];

function init() {
    // For grading the window is fixed in size; here's general code:
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let canvasRatio = canvasWidth / canvasHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(new THREE.Color(0x000000));
    // CAMERA
    camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 40000);
    // CONTROLS
    cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);

    camera.position.set(100, 300, 600);
    cameraControls.target.set(4, 301, 92);

    fillScene();
}

function fillScene() {
    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 3000, 6000);
    // LIGHTS
    let ambientLight = new THREE.AmbientLight(0x222222);
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(200, 400, 500);

    let light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light2.position.set(-400, 200, -300);

    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    if (axes) {
        Coordinates.drawAllAxes({ axisLength: 300, axisRadius: 2, axisTess: 50 });
    }
}

function addToDOM() {
    let container = document.getElementById('container');
    let canvas = container.getElementsByTagName('canvas');
    if (canvas.length > 0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    if (effectController.newAxes !== axes) {
        axes = effectController.newAxes;

        fillScene();
    }
    renderer.render(scene, camera);
}

function setupGui() {
    effectController = {
        newAxes: axes,
        dummy: function () { }

    };

    let gui = new dat.GUI();
    gui.add(effectController, "newAxes").name("Mostrar ejes");
}

function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return (n * (factorial(n - 1)));
    }
}

function combinatoria(n, p) {
    if (p >= 0 && p <= n) {
        return factorial(n) / (factorial(p) * (factorial(n - 1)));
    } else{
        return 0;
    }
}

function polinomioBernstein(n, i, t) {
    return combinatoria(n, i) * Math.pow(t, i) * Math.pow((1 - t), (n - i));
}

function superficieBezier(m, n) {
    var x, y, z;

    console.log(m,n);

    for (var u = 0; u < 0.5; u += 0.05) {
        for (var v = 0; v < 0.5; v += 0.05) {
            x = 0;
            y = 0;
            z = 0;
            for (var i = 0; i < n.length; i++) {
                for (var j = 0; j < m.length; j++) {
                    x += polinomioBernstein(n.length, i, u) * polinomioBernstein(m.length, j, v) * m[j].x * n[i].x;
                    y += polinomioBernstein(n.length, i, u) * polinomioBernstein(m.length, j, v) * m[j].y * n[i].y;
                    z += polinomioBernstein(n.length, i, u) * polinomioBernstein(m.length, j, v) * m[j].z * n[i].z;
                }
            }
            puntos.push(new THREE.Vector4(x, y, z, 1));
            //colores.push(1.0, 1.0, 1.0, 1.0);
        }
    }

}

function esfera(x, y, z) {
    var geometry = new THREE.SphereGeometry(2, 2, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x0FFFF0 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    scene.add(cube);
}

function onLoad() {
    init();
    setupGui();
    addToDOM();
    animate();

    superficieBezier([new THREE.Vector4(-1 / 5 * 10, -2 / 5 * 10, 2 / 5 * 10, 1.0),
        new THREE.Vector4(-2 / 5 * 10, -3 / 5 * 10, 3 / 5 * 10, 1.0),
        new THREE.Vector4(-4 / 5 * 10, -4 / 5 * 10, 1 / 5 * 10, 1.0)], [new THREE.Vector4(4 / 5* 10, -1 / 5 * 10, 3 / 5 * 10, 1.0),
        new THREE.Vector4(3 / 5 * 10, -3 / 5 * 10, 2 / 5 * 10, 1.0),
        new THREE.Vector4(2 / 5 * 10, -1 * 10, 4 / 5* 10, 1.0)]);

    for(var i = 0; i < puntos.length; i++){
        esfera(puntos[i].x, puntos[i].y, puntos[i].z);
    }
}
