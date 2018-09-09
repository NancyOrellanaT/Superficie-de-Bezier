var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 7;

eje();

var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

function eje(){
    var axis = new THREE.AxisHelper(4);
    axis.position.x = 1;
    axis.position.y = 1;
    axis.position.z = 1;
    scene.add(axis);
}