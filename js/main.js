var camera;
var scene;
var renderer;
var controls;

var sphere;
var text
var water;
var ground;

init();
animate();

function ground() {
    var material = new THREE.MeshBasicMaterial({
        color: 0x383737,
        side: THREE.DoubleSide
    });
    var geometry = new THREE.CircleGeometry(1000, 32);
    ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);
}

function sky() {
    var geometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var material = new THREE.MeshBasicMaterial({
        color: 0xad9aab,
        side: THREE.BackSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

function water() {
    var geometry = new THREE.CircleGeometry(1000, 32);
    water = new THREE.Water(geometry, {
        color: 0xffffff,
        scale: 4,
        flowDirection: new THREE.Vector2(1,1),
        textureWidth: 1024,
        textureHeight: 1024
    });
    water.position.y = 1;
    water.rotation.x = Math.PI * -0.5;
    scene.add(water);
}

function sphere() {
    var geometry = new THREE.SphereGeometry(70, 30, 30);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00f24c,
        wireframe: true
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);
}

function init() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 80, 400);
    camera.zoom = 1.3;
    camera.updateProjectionMatrix();


    scene = new THREE.Scene();

    ground();
    water();
    sky();
    sphere();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;

    renderer.render( scene, camera );
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
