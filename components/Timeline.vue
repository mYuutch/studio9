<template>
    <div class="flex pb-32 grow  gap-16">
      <div id="events" class="text-xl w-8/12 h-full text-neutral-400 ">
        <div v-if="selectedIndex !== null" class="" v-html="events[selectedIndex]"></div>
        <div v-else class="italic text-gray-500">Select a date to view events.</div>
      </div>
      <div id="dates" class="flex flex-col text-neutral-600 text-6xl">
        <ul>
          <li v-for="(date, index) in dates" :key="index" @click="selectDate(index)" :class="{ 'text-neutral-300': selectedIndex === index }">
            {{ date }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dates: ['2021', '2022', '2023', '2023-2024'],
        events: [
          "<div class='relative overflow-hidden'><img class='mb-12' src='/iut.jpg' /></div><h2 class='text-2xl text-neutral-300'>Début de l'aventure</h2><p class='font-body'>Nous entamons notre parcours de formation en BUT MMI à l'IUT de Lens, jetant les bases de notre aventure dans le monde du multimédia et de l'informatique.</p>",
          "<div class='relative overflow-hidden'><img class='mb-12' src='/spe.jpg' /></div><h2 class='text-2xl text-neutral-300'>Spécialisation et focus</h2><p class='font-body'>Sofian et Enzo décident de se spécialiser dans le domaine du web, tandis que Tiago oriente ses compétences vers la communication, marquant le début de nos parcours individuels au sein de l'équipe.</p>",
          "<div class='relative overflow-hidden'><img class='mb-12' src='/travail.jpg' /></div><h2 class='text-2xl text-neutral-300'>Professionaisation</h2><p class='font-body'>Nous mettons nos connaissances à l'épreuve lors de stages en entreprise, appliquant les enseignements acquis au cours de nos études et acquérant une expérience concrète dans le domaine.</p>",
          "<div class='relative overflow-hidden'><img class='mb-12' src='/logo.png' /></div><h2 class='text-2xl text-neutral-300'>Évolution et Lançement</h2><p class='font-body'>Tiago décide de changer de spécialité, explorant de nouveaux horizons au sein de notre équipe. Ensemble, nous lançons Studio 9, une nouvelle étape passionnante de notre parcours, combinant nos compétences variées pour offrir des solutions innovantes et créatives.</p>",
        ],
        selectedIndex: 0,
      };
    },
    methods: {
      selectDate(index) {
        this.selectedIndex = index;
      },
    },
  };
  </script>
  
  <style scoped>
  #dates {
    cursor: pointer;
  }
  
  </style>
  