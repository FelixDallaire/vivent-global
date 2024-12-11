<template>
    <div class="container mt-5">
      <div class="row">
        <!-- Left Column: Map Selection Card -->
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4>Select a Map</h4>
            </div>
            <div class="card-body">
              <div class="list-group">
                <!-- Example of a map selection list -->
                <button v-for="map in maps" :key="map.id" class="list-group-item list-group-item-action"
                        @click="selectMap(map)">
                  {{ map.name }}
                </button>
              </div>
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
              <!-- Show the selected map preview image -->
              <img :src="selectedMapImage" alt="Map Preview" class="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Example maps (in a real app, these could come from an API or database)
        maps: [
          { id: 1, name: 'Map 1', imageUrl: '/assets/maps/map1.svg' },
          { id: 2, name: 'Map 2', imageUrl: '/assets/maps/map2.svg' },
          { id: 3, name: 'Map 3', imageUrl: '/assets/maps/map3.sg' },
        ],
        selectedMapImage: '/assets/maps/map1.jpg', // Default preview image
      };
    },
    methods: {
      // When a user clicks a map card, update the preview
      selectMap(map) {
        this.selectedMapImage = map.imageUrl;
      },
    },
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
  