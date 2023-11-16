<template>

</template>

<script>

/* import { Application } from '@splinetool/runtime'; */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'; // Ensure the correct path to RGBELoader
import Stats from 'three/examples/jsm/libs/stats.module'

        
// INIT SCENE
const scene = new THREE.Scene()
/*scene.add(new THREE.AxesHelper(5))*/
//CAMERA
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    500
)

camera.position.z = 75
camera.position.y = 20

//LIGHTS

/*
const light1 = new THREE.SpotLight()
light1.position.copy(camera.position);
light1.intensity = 100.0
light1.angle = Math.PI / 5;
scene.add(light1)
*/

const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( alight );


//RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
renderer.setClearColor(0x000000,1);
renderer.shadowMap.enabled = true
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setPixelRatio( window.devicePixelRatio * 0.7 );
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

/*
// TEST CUBE
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.scale.z = 20
cube.scale.x = 20
cube.scale.y = 20
cube.position.z = -40
cube.position.y = 15
scene.add(cube);
*/

//CHARGEMENT MODEL EXTERNE
let group
const pivot = new THREE.Group(); 
  const loader = new GLTFLoader()
  loader.load(
    '/studio9_2.glb',
    function (gltf) {
         group = gltf.scene;


        group.traverse((child) => {
            if (child.isMesh) {

              const hdrEquirect = new RGBELoader().load(
                "/kloofendal_48d_partly_cloudy_puresky_1k.hdr",  
                () => { 
                  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
                }
              );
                const material = new THREE.MeshPhysicalMaterial({
                  transmission: 1,
                  thickness: 200,
                  clearcoat: 0.1,
                  metalness:0,
                  clearcoatRoughness: 0,
                  roughness: 0,
                  reflectivity: 0.4,
                  iridescence : 0.1,
                  iridescenceIOR : 1,
                  envMapIntensity: 0.8,
                  ior: 2.3,
                  side: THREE.DoubleSide,
                  envMap: hdrEquirect
                });
                child.material = material;
            }
        });

        pivot.add(group); // Add the group to the pivot
        scene.add(pivot); // Add the pivot to the scene

        const box = new THREE.Box3().setFromObject(group);
        const center = box.getCenter(new THREE.Vector3());
        group.position.set.sub(center)
        pivot.position.set(5,-5,-10)

        
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

var gridHelper = new THREE.GridHelper(1000, 100, 0x0000ff, 0x0000ff); // grid size, divisions, color, centerLineColor
gridHelper.position.set(0,0,-50)
gridHelper.rotation.x = Math.PI /2
scene.add(gridHelper);
          

// HANDLE RESIZE
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    render()
}

//STATS FPS
const stats = new Stats()
document.body.appendChild(stats.dom)


//ANIMATE
function animate() {
  if(group){

  }
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}

//RENDER
function render() {
    renderer.render(scene, camera)
}

animate()

  </script>
