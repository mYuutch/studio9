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
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

/*const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0); // 0 as the second parameter makes the background fully transparent*/

const renderer = new THREE.WebGLRenderer({ alpha: true})
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

  const loader = new GLTFLoader()
  loader.load(
    '/cube.glb',
    function (gltf) {
        // Assuming the loaded model is a group
        const group = gltf.scene;

        // Traverse the group and apply the material to each mesh
        group.traverse((child) => {
            if (child.isMesh) {
                const material = new THREE.MeshStandardMaterial({
                  transparent: true,
                  opacity: 0.1,  // Adjust the opacity as needed
                  roughness: 0.1,  // Adjust the roughness for a smoother or rougher appearance
                  metalness: 0.7,  // Adjust the metalness for reflections
                  color: new THREE.Color(0x000000),  // Adjust the color as needed
                  envMapIntensity: 1.0,  // Adjust the intensity of environment map reflections
                  refractionRatio: 0.1,  // Adjust the refraction ratio for a
                });
                material.side = THREE.DoubleSide;
                child.material = material;
            }
        });

        scene.add(group);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
);

// Add a text element behind the glass model
const textElement = document.createElement('div');
        textElement.className = 'behind';
        textElement.textContent = 'Hello, Three.js!';
        document.body.appendChild(textElement);


 // 0 as the second parameter makes the background fully transparent


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
}

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

  .behind {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: red;
            font-family: Arial, sans-serif;
            font-size: 24px;
            z-index: -1; /* Set a value lower than 0 to ensure it's rendered behind the canvas */
        }
  </style>
