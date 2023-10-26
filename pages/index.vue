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

<style scoped>
.title {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne';
  font-size: 5rem;
}

.title h1 {
  margin-top: 150px;
}
</style>
