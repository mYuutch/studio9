<template>
  <Header></Header>
  <div class="canvas-cont">
    <canvas id="canvas3d">
    </canvas>
    <canvas id="canvasTrail">
    </canvas>
  </div>
</template>

<script>
import { Application } from '@splinetool/runtime';


export default {
  mounted() {
    // Access the document and create Application after the component has been mounted
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://draft.spline.design/MBnMYtGv-PoDG8-h/scene.splinecode');
  },
};
</script>

<style>
body{
  background-color: black;
}
#canvas3d{
  background-color: black;
  width: 50vw;
  height: 50vh;
}
</style>
