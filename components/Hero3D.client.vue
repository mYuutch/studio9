  <template>
    <div id="baseline" class=" absolute z-[-1] container box-border bg-black my-24 flex mx-auto items-center justify-center px-24 py-24">
        <h1 class="text-8xl text-white uppercase">Ensemble, vers de nouveaux horizons créatifs </h1>
    </div>
  </template>

  <script>

    /* import { Application } from '@splinetool/runtime'; */
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'; // Ensure the correct path to RGBELoader
  import Stats from 'three/examples/jsm/libs/stats.module'
  import * as htmlToImage from 'html-to-image'
  
          
  // INIT SCENE
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )
  camera.position.z = 50
  camera.position.y = 0
  camera.rotation.set(0,0,0)

  //LIGHTS

  const light = new THREE.PointLight()
light.color = new THREE.Color("#999")
light.power = 800
light.decay = 0.45
  
  const light1 = new THREE.SpotLight()
  light1.position.set(60,0,20)
  light1.rotation.set(0,700,0)
  light1.intensity = 100.0
  light1.angle = Math.PI / 5;
  scene.add(light1)
  

  
  const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( alight );

  //RENDERERS
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true})
  renderer.setClearColor(0x000000,1);
  renderer.shadowMap.enabled = true
  renderer.setPixelRatio( window.devicePixelRatio * 0.7 );
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //MOUSE POS
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = - (event.clientY / window.innerHeight) * 2 + 1;
  }, false);


  const divContainer = document.getElementById('baseline');

// Use html2canvas to render the HTML content to a canvas


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
                  "/kloofendal_43d_clear_puresky_1k.hdr",  
                  () => { 
                    hdrEquirect.mapping = THREE.EquirectangularReflectionMapping; 
                  }
                );
                  const material = new THREE.MeshPhysicalMaterial({
                    transmission: 0.99,
                    thickness: 200,
                    clearcoat: 1.7,
                    metalness:0.2,
                    clearcoatRoughness: 0.1,
                    roughness: 0,
                    reflectivity: 0.9,
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
        

          setTimeout(() => {
  htmlToImage.toCanvas(document.getElementById('baseline'), { quality: 1 })
    .then((canvas) => {
      const texture = new THREE.CanvasTexture(canvas);
      const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height);
      const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(geometry, material);
      plane.scale.set(0.1,0.1, 0.1)
      plane.position.set(10, 5, -10);
      scene.add(plane);
    })
    .catch((error) => {
      console.error('Error rendering HTML to image:', error);
    });
}, 1000);

         
          pivot.position.set(0,15,0)

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
      /*controls.update()*/
      render()
      stats.update()
  }

  //RENDER
  function render() {
      renderer.render(scene, camera)
  }

  animate()

    </script>

<style>
  .bg-clip-text {
    -webkit-background-clip: text;
    color: transparent;
  }
  
</style>