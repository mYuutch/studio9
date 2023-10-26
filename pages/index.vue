<template>
  <div class="canvas-cont">
    <canvas id="canvas3d"></canvas>
  </div>
</template>

<script>
import { Application } from '@splinetool/runtime';

export default {
  mounted() {
    // Access the document and create Application after the component has been mounted
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load('https://draft.spline.design/ruREpqhankik9NyJ/scene.splinecode');
  },
};
</script>

<style>
.canvas-cont{
  background-color: black;
  width: 100vw;
  height: 100vh;
}
</style>
