<template>
  <div class="w-full">
    <form class="w-full" @submit.prevent="submitForm">
      <input  class="" type="hidden" name="access_key" value="235f9180-0af4-4aff-a700-6092d8f4dd41">
      <div class="flex gap-8 mb-12">
      <input class=" border-0 border-b-2 bg-transparent w-1/2 h-24 placeholder:text-neutral-400 text-4xl" type="text" name="name" placeholder="Votre nom" required v-model="formData.name">
      <input class=" border-0 border-b-2 bg-transparent w-1/2 h-24 placeholder:text-neutral-400 text-4xl" type="email" name="email" placeholder="example@xyz.com" required v-model="formData.email">
    </div>

    <div class="flex gap-0 items-center">
      <h2>Je suis intéréssé par </h2>
      <select class="bg-transparent text-4xl border-0" name="message" required v-model="formData.selectedOption">
        <option value="Développement de site e-commerce">le développement de site e-commerce</option>
        <option value="Développement de site vitrine">le développement de site vitrine</option>
        <option value="Développement web">le développement web</option>
        <option value="Identité visuelle">l'identité visuelle</option>
        <option value="Développement d'une application mobile">le développement d'une application mobile</option>
        <option value="Referencement">le référencement</option>
        <option value="Marketing Digital">le marketing digital</option>
        <option value="Print">le print</option>
        <!-- Add more options as needed -->
      </select>
      <div class="mx-auto" id="oval-parent"><button class="text-neutral-900" id="oval" type="submit">Envoyer</button></div>
    </div>
      
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        access_key: "235f9180-0af4-4aff-a700-6092d8f4dd41",
        name: "",
        email: "",
        selectedOption: "", // Added property for selected option
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        // Create the message based on selected option
        const message = `De : ${this.formData.email}, je m'appelle ${this.formData.name} et je suis intéressé à propos de : ${this.formData.selectedOption}`;

        // Update the formData.message with the constructed message
        this.formData.message = message;

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          this.$router.push('/success');
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
};
</script>

<style>
#oval_parent{
    background:black;
    overflow:hidden;
}

#oval{
    width: 220px;
    height: 100px;
    margin:10px 0 0 -10px;  
    background: white;
    -moz-border-radius: 100px / 50px;
    -webkit-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
}
</style>
