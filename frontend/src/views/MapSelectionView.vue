<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Left Column: Map Selection Card -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4>Select a Map for Event ID: {{ eventId }}</h4>
          </div>
          <div class="card-body">
            <div class="list-group">
              <!-- Loop through the maps array to create buttons -->
              <button v-for="map in maps" :key="map.id" class="list-group-item list-group-item-action"
                      @click="selectMap(map)">
                {{ map.name }}
              </button>
            </div>
            <!-- Confirm Button -->
            <button class="btn btn-primary mt-3" @click="confirmMapSelection">Confirm Map Selection</button>
          </div>
        </div>
      </div>
      <!-- Right Column: Image Preview -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4>Preview Map</h4>
          </div>
          <div class="card-body text-center">
            <img :src="selectedMapImage" alt="Map Preview" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Correct import for ref
import { useRouter } from 'vue-router';
import { useEventStore } from '@/stores/event';
import map1 from '@/assets/maps/map1.svg';
import map2 from '@/assets/maps/map2.svg';
import map3 from '@/assets/maps/map3.svg';

export default {
  props: {
    eventId: String,
  },
  setup(props) {
    const router = useRouter();
    const eventStore = useEventStore();
    const maps = ref([
      { id: 1, name: 'Map 1', imageUrl: map1 },
      { id: 2, name: 'Map 2', imageUrl: map2 },
      { id: 3, name: 'Map 3', imageUrl: map3 },
    ]);
    const selectedMapImage = ref(maps.value[0].imageUrl); // Default to first map's image

    const selectMap = (map) => {
      selectedMapImage.value = map.imageUrl;
    };

    const confirmMapSelection = async () => {
      try {
        await eventStore.updateEvent(props.eventId, { mapType: selectedMapImage.value });
        router.push({ name: 'MapEditing', params: { eventId: props.eventId } });
      } catch (error) {
        console.error('Failed to update event with selected map:', error);
        alert('Failed to update the event: ' + error.message);
      }
    };

    return {
      maps,
      selectedMapImage,
      selectMap,
      confirmMapSelection,
    };
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 1.2rem;
  font-weight: bold;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
