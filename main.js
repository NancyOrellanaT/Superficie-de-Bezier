var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

dibujarLineas(1);
dibujarLineas(2);
dibujarLineas(3);

var animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

function dibujarLineas(caso){
    var material;
    var geometry = new THREE.Geometry();
    switch(caso){
        case 1:
            material = new THREE.LineBasicMaterial({ color: 0xDE4343 });
            geometry.vertices.push(
            new THREE.Vector3(0, 0, 0 ),
            new THREE.Vector3( 0, 3, 0 ),
            );
            break;
        case 2:
            material = new THREE.LineBasicMaterial({ color: 0x2FA63B });
            geometry.vertices.push(
            new THREE.Vector3(4, 0, 0 ),
            new THREE.Vector3( 0, 0, 0 ),
            );
            break;
        case 3:
            material = new THREE.LineBasicMaterial({ color: 0x0830D7 });
            geometry.vertices.push(
            new THREE.Vector3(0, 0, 0 ),
            new THREE.Vector3( -2, -2, 1),
            );
            break;
    }

    var line = new THREE.Line( geometry, material );
    scene.add( line );

}