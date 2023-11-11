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

        let group;
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
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)



//RENDERER
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true



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


//CHARGEMENT MODEL EXTERNE
  const loader = new GLTFLoader()
  loader.load(
    '/cube.glb',
    function (gltf) {
         group = gltf.scene;
         const gradientTexture = new THREE.TextureLoader().load('/glassSheen.jpg');
        group.traverse((child) => {
            if (child.isMesh) {
                const material = new THREE.MeshPhysicalMaterial({
                  transmission: 0.99,
                  sheen: 0.9,
                  specularIntensity: 0.9,
                  thickness: 0.8,
                  clearcoat: 0.9,
                  roughness: 0.1, 
                  reflectivity: 2.3,  
                  envMapIntensity: 1.0, 
                  ior: 1.15,
                  iridescence: 0.8,
                 color: new THREE.Color(0xFFFFFF),
                  sheenColor: new THREE.Color(0x2E2E2E),
                  sheenColorMap: gradientTexture
                });
                material.side = THREE.DoubleSide;
                child.material = material;
            }
        });

        group.scale.x = 1
        group.scale.y = 0.6
        group.scale.z  
        group.position.x = 0
        scene.add(group);
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
    if(group){
      
      if(group.position.x < -1){
        group.position.x = 0.5
      }
      group.position.x -= 0.001

 
    }

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
