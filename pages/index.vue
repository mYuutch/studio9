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
const light1 = new THREE.SpotLight()
light1.position.set(0, 0, 10)
scene.add(light1)

const light2 = new THREE.SpotLight()
light1.position.set(0, 0, -5)
scene.add(light2)

const light3 = new THREE.SpotLight()
light1.position.set(-3, 0, 5)
scene.add(light3)

//CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
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



camera.position.z = 5

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

/*
     // Create an HTML element
     const textElement = document.createElement('div');
      textElement.textContent ="Créateurs d'éxperiences innovantes";
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
      context.fillText("Créateurs d'éxperiences innovantes", 50, 100);

      const texture = new THREE.CanvasTexture(canvas);

      // Create a plane with the HTML element texture
      const planeGeometry = new THREE.PlaneGeometry(5, 4, 8);
      const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
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
                  transmission: 0.95,
                  sheen: 0.9,
                  specularIntensity: 0.9,
                  thickness: 1.3,
                  clearcoat: 0.9,
                  roughness: 0, 
                  reflectivity: 0.8,  
                  ior: 1.15,
                  color: new THREE.Color(0xFFFFFF),
                  sheenColor: new THREE.Color(0xD160E3),
                  sheenColorMap: gradientTexture,
                  side: THREE.DoubleSide
                });

                
                child.material = material;
                group.scale.x = 0.05
                group.scale.y = 0.05
                group.scale.z = 0.05

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
  /*if (group) {

    group.rotation.y +=0.005
  }*/
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
