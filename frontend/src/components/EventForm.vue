<template>
  <form @submit.prevent="handleSubmit" class="needs-validation text-start" novalidate>
    <div class="mb-3">
      <label for="eventName" class="form-label text-uppercase">Nom de l'événement</label>
      <input type="text" id="eventName" v-model="form.name" required placeholder="Entrez le nom de l'événement"
        class="form-control border border-black border-2" />
      <div class="invalid-feedback">Veuillez entrer le nom de l'événement.</div>
    </div>

    <div class="mb-3">
      <label for="eventDescription" class="form-label text-uppercase">Description</label>
      <textarea id="eventDescription" v-model="form.description" placeholder="Décrivez l'événement"
        class="form-control border border-black border-2"></textarea>
      <div class="invalid-feedback">Veuillez décrire l'événement.</div>
    </div>

    <div class="mb-5">
      <div class="d-flex align-items-center gap-2">
        <label for="eventStartDate" class="form-label text-uppercase m-0">De:</label>
        <input type="date" id="eventStartDate" v-model="form.startDate"
          class="form-control border border-black border-2" :min="today" required />
        <label for="eventEndDate" class="form-label text-uppercase m-0">À:</label>
        <input type="date" id="eventEndDate" v-model="form.endDate" class="form-control border border-black border-2"
          :min="form.startDate || today" required />
      </div>
      <div class="invalid-feedback">Veuillez choisir des dates valides.</div>
    </div>

    <div class="text-center mb-4">
      <button type="submit" class="btn btn-outline-dark text-uppercase border-2">
        {{ form._id ? "Mettre à jour l'événement" : "Créer l'événement" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    initialData: {
      type: Object,
      default: () => ({
        _id: null,
        name: "",
        description: "",
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
      }),
    },
  },
  data() {
    return {
      form: { ...this.initialData },
      today: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    handleSubmit() {
      if (!this.form.name) {
        alert("Veuillez remplir tous les champs requis.");
        return;
      }
      this.$emit("form-submit", this.form);
    },
  },
};
</script>

<style scoped></style>
