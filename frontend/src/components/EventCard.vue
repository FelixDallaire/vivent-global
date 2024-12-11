<template>
  <div class="event-card">
    <h3>{{ event.name }}</h3>
    <!-- More details can be added here as needed -->
  </div>
</template>

<script>
export default {
  props: {
    event: Object
  }
};
</script>

<style scoped>
.event-card {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 15px;
}
</style>
