<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="eventName">Event Name:</label>
      <input id="eventName" v-model="form.name" type="text" required placeholder="Enter event name"
        class="form-control">
    </div>
    <div class="form-group">
      <label for="eventDescription">Description:</label>
      <textarea id="eventDescription" v-model="form.description" placeholder="Describe the event"
        class="form-control"></textarea>
    </div>
    <div class="form-group">
      <label for="eventStartDate">Start Date:</label>
      <input id="eventStartDate" type="date" v-model="form.startDate" class="form-control" :min="today">
    </div>
    <div class="form-group">
      <label for="eventEndDate">End Date:</label>
      <input id="eventEndDate" type="date" v-model="form.endDate" class="form-control" :min="form.startDate || today">
    </div>
    <div class="form-group">
      <label for="mapType">Map Type:</label>
      <select id="mapType" v-model="form.mapType" class="form-control" required>
        <option disabled value="">Select a map type</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">{{ form._id ? 'Update Event' : 'Create Event' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    initialData: {
      type: Object,
      default: () => ({
        _id: null,
        name: '',
        description: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        mapType: ''
      })
    }
  },
  data() {
    return {
      form: { ...this.initialData },
      today: new Date().toISOString().substr(0, 10)
    };
  },
  methods: {
    handleSubmit() {
      if (!this.form.name || !this.form.mapType) {
        alert('Please fill out all required fields.');
        return;
      }
      this.$emit('form-submit', this.form);
    }
  }
};
</script>