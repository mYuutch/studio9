  <template>
    <Header></Header>
    <!--
    <div class="canvas-cont">
      <canvas id="canvas3d">
      </canvas>
    </div>-->


  </template>

  <script>

  /* import { Application } from '@splinetool/runtime'; */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'; // Ensure the correct path to RGBELoader
import Stats from 'three/examples/jsm/libs/stats.module'

  export default {
    mounted() {
      if (process.client){

        
// INIT SCENE
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))
//CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
)
//LIGHTS
const light1 = new THREE.SpotLight()
light1.position.copy(camera.position);
light1.intensity = 5.0
light1.angle = Math.PI / 5;
scene.add(light1)

const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( alight );




//RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);



camera.position.z = 5

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.scale.z = 20
cube.scale.x = 20
cube.scale.y = 20

cube.position.z = -40
cube.position.y = 15
// Add the cube to the scene
scene.add(cube);

let group;
const pivotGroup = new THREE.Group();

//CHARGEMENT MODEL EXTERNE
  const loader = new GLTFLoader()
  loader.load(
    '/studio9_2.glb',
    function (gltf) {
         group = gltf.scene;
         const gradientTexture = new THREE.TextureLoader().load('/glassSheen.jpg');
        group.traverse((child) => {
            if (child.isMesh) {

              const hdrEquirect = new RGBELoader().load(
                "/empty_warehouse_01_4k.hdr",  
                () => { 
                  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
                }
              );
                const material = new THREE.MeshPhysicalMaterial({
                  transmission: 0.99,
                  sheen: 0,
                  specularIntensity: 0,
                  thickness: 150,
                  clearcoat: 1,
                  roughness: 0.1, 
                  reflectivity: 0.3,
                  iridescence : 0.1,
                  iridescenceIOR : 1.1,
                  envMapIntensity: 0.7,
                  ior: 2.3,
                  sheenColorMap: gradientTexture,
                  side: THREE.DoubleSide,
                  envMap: hdrEquirect
                });

                
                child.material = material;

                pivotGroup.position.z = 1
                pivotGroup.position.x = 1
                pivotGroup.add(group)
            }
        });
        scene.add(pivotGroup);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);
          

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

    }
 },
};
  </script>

  <style>
  #canvas3d{
    background-color: black;
    width: 50vw;
    height: 50vh;
  }
  </style>
