<template>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="eventName">Event Name:</label>
        <input id="eventName" v-model="form.name" type="text" required>
      </div>
      <div>
        <label for="eventDescription">Description:</label>
        <textarea id="eventDescription" v-model="form.description"></textarea>
      </div>
      <!-- Additional form fields can be added here -->
      <button type="submit">{{ isEditMode ? 'Update Event' : 'Create Event' }}</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      event: {
        type: Object,
        default: () => ({ name: '', description: '' })
      }
    },
    data() {
      return {
        form: {
          name: this.event.name,
          description: this.event.description
        },
        isEditMode: !!this.event._id
      };
    },
    methods: {
      handleSubmit() {
        // Emit an event with the form data
        this.$emit('submit', { ...this.form, id: this.event._id });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style your form here */
  </style>
  