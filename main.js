

let camera, scene, renderer;
let cameraControls, effectController;
let clock = new THREE.Clock();
let gridX = false;
let gridY = false;
let gridZ = false;
let axes = false;
let ground = true;

function init() {
    //let canvasWidth = 846;
    //let canvasHeight = 494;
    // For grading the window is fixed in size; here's general code:
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let canvasRatio = canvasWidth / canvasHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
    // CAMERA
    camera = new THREE.PerspectiveCamera( 45, canvasRatio, 1, 40000 );
    // CONTROLS
    cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);

    camera.position.set( 100, 300, 600 );
    cameraControls.target.set(4,301,92);

    fillScene();
}

function fillScene() {
    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x808080, 3000, 6000 );
    // LIGHTS
    let ambientLight = new THREE.AmbientLight( 0x222222 );
    let light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
    light.position.set( 200, 400, 500 );

    let light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
    light2.position.set( -400, 200, -300 );

    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    if (ground) {
        Coordinates.drawGround({size:1000});
    }
    if (gridX) {
        Coordinates.drawGrid({size:1000,scale:0.01});
    }
    if (gridY) {
        Coordinates.drawGrid({size:1000,scale:0.01, orientation:"y"});
    }
    if (gridZ) {
        Coordinates.drawGrid({size:1000,scale:0.01, orientation:"z"});
    }
    if (axes) {
        Coordinates.drawAllAxes({axisLength:300,axisRadius:2,axisTess:50});
    }
}

function addToDOM() {
    let container = document.getElementById('container');
    let canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
    {
        gridX = effectController.newGridX;
        gridY = effectController.newGridY;
        gridZ = effectController.newGridZ;
        ground = effectController.newGround;
        axes = effectController.newAxes;

        fillScene();
    }
    renderer.render(scene, camera);
}

function setupGui() {

    effectController = {

        newGridX: gridX,
        newGridY: gridY,
        newGridZ: gridZ,
        newGround: ground,
        newAxes: axes,

        dummy: function() {
        }
    };

    let gui = new dat.GUI();
    gui.add(effectController, "newGridX").name("Show XZ grid");
    gui.add(effectController, "newGridY").name("Show YZ grid");
    gui.add(effectController, "newGridZ").name("Show XY grid");
    gui.add(effectController, "newGround").name("Show ground");
    gui.add(effectController, "newAxes").name("Show axes");
}

function onLoad()
{
    init();
    setupGui();
    addToDOM();
    animate();
}



