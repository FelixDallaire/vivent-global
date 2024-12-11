<template>
    <div class="container mt-5">
      <h1>Editing Map for Event ID: {{ eventId }}</h1>
      <!-- Implement map editing functionality here -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      eventId: String,  // Now it accepts eventId as a prop
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  </style>
  