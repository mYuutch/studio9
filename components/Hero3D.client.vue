  <template>
<div class="container bg-black my-24 flex w-full mx-auto items-center justify-center px-24 py-16">
        <h1 class="text-8xl text-white w-2/5 uppercase">Ensemble, vers de <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">nouveaux horizons créatifs</span></h1>
    </div>
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
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )

  camera.position.z = 40
  camera.position.y = 0
  camera.rotation.set(0,0,0)

  //LIGHTS

  
  const light1 = new THREE.SpotLight()
  /*light1.position.copy(camera.position);*/
  light1.position.set(60,0,20)
  light1.rotation.set(0,700,0)
  light1.intensity = 100.0
  light1.angle = Math.PI / 5;
  scene.add(light1)
  

  const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( alight );


  //RENDERER
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
  renderer.setClearColor(0x000000,1);
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio( window.devicePixelRatio * 0.7 );
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //CONTROLS
  const controls = new OrbitControls(camera, renderer.domElement);


  //MOUSE POS
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', function(event) {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
}, false);


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
                  "/empty_warehouse_01_1k.hdr",  
                  () => { 
                    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
                  }
                );
                  const material = new THREE.MeshPhysicalMaterial({
                    transmission: 1,
                    thickness: 200,
                    clearcoat: 0,
                    metalness:0.1,
                    clearcoatRoughness: 0,
                    roughness: 0,
                    reflectivity: 0.5,
                    envMapIntensity: 0.4,
                    ior: 2.3,
                    side: THREE.DoubleSide,
                    envMap: hdrEquirect
                  });
                  child.material = material;
              }
          });

      
          pivot.add(group); // Add the group to the pivot
          scene.add(pivot); // Add the pivot to the scene
          

          
         
          pivot.position.set(0,0,0)

          const box = new THREE.Box3().setFromObject(group);
          const center = box.getCenter(new THREE.Vector3());
          group.position.sub(center);

          group.rotation.order = 'XYZ';
          group.rotation.set(0, 0, 0);
          pivot.rotation.set(0,0,0);

          
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
    if(group){

        group.rotation.x = mouseY * -0.05;
        group.rotation.y = mouseX * 0.05;
      
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
