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
import Stats from 'three/examples/jsm/libs/stats.module'


  export default {
    mounted() {
      if (process.client){

        
// INIT SCENE
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

//LIGHTS
const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff); // Soft white light
scene.add(ambientLight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1.5,
    500
)



//RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);



camera.position.z = -5
/*
     // Create an HTML element
     const textElement = document.createElement('div');
      textElement.textContent = 'Hello, Three.js!';
      textElement.style.color = 'red';
      textElement.style.fontFamily = 'Arial, sans-serif';
      textElement.style.fontSize = '100000px';

      // Create a CanvasTexture from the HTML element
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 500; // Set the width of the canvas (adjust as needed)
      canvas.height = 500
            ; // Set the height of the canvas (adjust as needed)
      context.fillStyle = '';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = '5rem Arial, sans-serif';
      context.fillStyle = 'white';
      context.fillText('Studio 9', 50, 100);

      const texture = new THREE.CanvasTexture(canvas);

      // Create a plane with the HTML element texture
      const planeGeometry = new THREE.PlaneGeometry(5, 4, 8);
      const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.z = -5
      plane.position.y = -0.33
      scene.add(plane);
*/

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
                const material = new THREE.MeshPhysicalMaterial({
                  transmission: 0.9,
                  sheen: 0,
                  specularIntensity: 0.9,
                  thickness: 1.8,
                  clearcoat: 0.9,
                  roughness: 0, 
                  reflectivity: 0.8,  
                  envMapIntensity: 1.0, 
                  ior: 1.15,
                  iridescence: 0.8,
                 /*color: new THREE.Color(0xD160E3),*/
                  sheenColor: new THREE.Color(0xD160E3),
                  sheenColorMap: gradientTexture
                });
                material.side = THREE.DoubleSide;
                child.material = material;
                group.position.set(-15,0,-15)
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
  if (group) {

    group.rotation.y +=0.005
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
