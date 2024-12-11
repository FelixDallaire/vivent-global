<template>
    <div class="map-controls">
      <button @click="$emit('zoom-in')">+</button>
      <button @click="$emit('zoom-out')">-</button>
      <button @click="$emit('center-map')">Center</button>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .map-controls {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: #333;
    color: white;
    font-size: 20px;
    cursor: pointer;
    outline: none;
  }
  
  button:hover {
    background-color: #555;
  }
  </style>
  