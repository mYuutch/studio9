<!-- ThreeDModel.vue -->
<template>
    <div ref="canvasContainer"></div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Adjust the path as needed
  import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'; // Adjust the path as needed
  
  export default {
    mounted() {
      this.initThreeDModel();
    },
    methods: {
      initThreeDModel() {
        // Set up your Three.js scene, camera, and renderer here
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        renderer.setPixelRatio( window.devicePixelRatio * 0.7 );
        renderer.setClearColor(0x000000,0);
        this.$refs.canvasContainer.appendChild(renderer.domElement);
  
        // Add your 3D model to the scene
        // You can load models using loaders or create simple shapes using Three.js primitives

        let group;
        const pivot = new THREE.Group();
        const loader = new GLTFLoader();
        loader.load('/shopping.glb', function (gltf) {
          group = gltf.scene;
  
          group.traverse((child) => {
            if (child.isMesh) {
              const hdrEquirect = new RGBELoader().load(
                "/mpumalanga_veld_puresky_1k.hdr",
                () => {
                  hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
                }
              );
              const material = new THREE.MeshPhysicalMaterial({
                transmission: 0,
                thickness: 0,
                clearcoat: 0,
                metalness: 0.8,
                clearcoatRoughness: 0.7,
                roughness: 0,
                reflectivity: 0,
                envMapIntensity: 0.5,
                ior: 0,
                side: THREE.DoubleSide,
                envMap: hdrEquirect,
              });
              child.material = material;
            }
          });
  
          group.scale.set(3,3,3)
          group.position.set(0,0,0)
          // Add the group to the pivot
          pivot.add(group);
          // Add the pivot to the scene
          scene.add(pivot);
  
          // Set the camera position
          camera.position.z = 10;
          camera.position.x = 8
  
          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);
  
            // Add any animation logic here
  
            // Render the scene
            renderer.render(scene, camera);
          };
  
          animate();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any styling specific to your 3D model container */
  </style>
  