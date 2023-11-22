<template>

    <div class="w-full px-4 overflow-hidden">
      <Gradient/>
    <slot/> 
  </div>
</template>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
}

body{
  background-color: #0a0a0a;
  overflow-x: hidden;
}

canvas{
  position: absolute;
  top: 0;
  width: 100%;
}
</style>