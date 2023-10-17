<template>

    <div class="wrapper">
    </div>
        <slot/>
    
  
</template>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
}

.wrapper{
    position: absolute;
    z-index: -1;
    height: 100vh;
    width: 100vw;
    background: 
    url('https://images.unsplash.com/photo-1548159417-f283998827c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    filter: blur(1px);
}

</style>