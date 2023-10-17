<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm">
      <input type="hidden" name="access_key" value="235f9180-0af4-4aff-a700-6092d8f4dd41">
      <input type="text" name="name" required v-model="formData.name">
      <input type="email" name="email" required v-model="formData.email">
      <textarea name="message" required v-model="formData.message"></textarea>
      <button type="submit">Submit Form</button>
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
          message: "",
        },
      };
    },
    methods: {
      async submitForm() {
        try {
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
.form-wrapper{
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
}

.form-wrapper form{
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.form-wrapper form input,textarea,button{
  width: 500px;
  background-color: rgba(255, 255, 255, 0.09);
  margin: 10px;
  height: 50px;
  border-radius: 10px;
  border: 0.5px solid rgba(255, 255, 255, 0.194);
}

.form-wrapper form textarea{
  height: 100px;
}

.form-wrapper form button{
  background-color: rgba(255, 255, 255, 0.334) ;
}

.video{z-index: 100;}
</style>