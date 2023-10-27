<template>
    <nav>
        <a href="">Studio 9</a>
        <a href="">L'agence</a>
        <a href="">Nos valeurs</a>
        <a href="">Contactez-nous</a>
    </nav>
</template>
<style>
nav a{
    text-decoration: none;
    color: white;
    font-family: sans-serif;
    margin-left: 50px;
    font-size: 1.2rem;
}

nav a:hover{
    text-decoration: underline;
}

nav a:first-child{
    flex-grow: 1;
    font-weight:600;
    font-size: 1.3rem;
}
nav{
    display: flex;
    background-color: black;
    justify-content: flex-end;
    width: 90%;
    margin: auto;
    margin-top: 30px;
}
</style>