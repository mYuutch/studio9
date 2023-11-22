<template>
    <div class="hero z-[-1] ">
      <div class="hero-gradient__container">
        <div class="hero-gradient__wrapper">
          <div class="hero-gradient" id="hero-gradient__three"></div>
          <div class="hero-gradient" id="hero-gradient__two"></div>
          <div class="hero-gradient" id="hero-gradient__one"></div>
        </div>
      </div>
      
    </div>
    <div class="content">
    </div>
  </template>
  
  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Rozha+One&family=Yeseva+One&display=swap');
  
    body {
      margin: 0;
      font-family: 'Rozha One', serif;
      overflow-x: hidden;
    }
  
    .hero {
      position: relative;
      background: linear-gradient(180deg, #0074FF 0%, #001C4A 100%);
    }
  
    .hero__content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: -1;
    }
  
    h1 {
      font-size: 5rem;
      text-align: center;
      line-height: 0.8;
      color: #FFFFFF;
    }
  
    .hero-gradient__container {
      display: block;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
    }
  
    .hero-gradient__wrapper {
      width: 100vw;
      height: 100vh;
      position: relative;
      filter: blur(6rem);
      display: flex;

    }
  
    .hero-gradient {
      position: absolute;
      border-radius: 50%;
      filter: none;
    }
  
    #hero-gradient__one {
      width: 50vw;
      height: 30vw;
      background: #021b3a;
      bottom: -5%;
      left: -15%;
    }
  
    #hero-gradient__two {
      width: 40vw;
      height: 10vw;
      background: #000f1f;
      top: 0;
      left: -30%;
    }
  
    #hero-gradient__three {
      width: 40vw;
      height: 50vw;
      background: #00173d;
      top: -10%;
      right: -15%;
    }
  </style>
  
 
<script setup>
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  const tl = gsap.timeline();
  tl.to('.hero-gradient', {
    x: "random(-25, 25, 5)vw",
    y: "random(-30, 30, 5)vh",
    rotation: "random(-45, 45, 5)",
    scale: "random(0.4, 1.2)",
    duration: 6,
    ease: "none",
    repeat: -1,
    repeatRefresh: true
  });
});
</script>