<template>
    <div class="map-canvas" ref="mapContainer"></div>
  </template>
  
  <script>
  import { SVG } from '@svgdotjs/svg.js';
  
  export default {
    props: {
      mapType: String,
    },
    data() {
      return {
        svgElement: null,
        panX: 0,
        panY: 0,
        scale: 1,
        initialViewbox: null,
        isDragging: false,
        dragStart: { x: 0, y: 0 },
      };
    },
    watch: {
      mapType: {
        immediate: true,
        handler(newVal) {
          this.loadMap(newVal);
        },
      },
    },
    methods: {
      loadMap(mapType) {
        if (mapType) {
          this.$refs.mapContainer.innerHTML = '';
  
          const mapUrl = `https://felixdallaire.github.io/svg-hosting/maps/${mapType}`;
          const draw = SVG().addTo(this.$refs.mapContainer).size('100%', '100%');
          this.svgElement = draw;
  
          fetch(mapUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to load map: ${response.statusText}`);
              }
              return response.text();
            })
            .then((svgContent) => {
              const svg = draw.svg(svgContent);
              const bbox = svg.bbox();
  
              this.initialViewbox = { x: bbox.x, y: bbox.y, width: bbox.width, height: bbox.height };
              this.resetViewbox();
  
              this.setupDragging();
            })
            .catch((error) => {
              console.error('Error loading the SVG map:', error);
            });
        }
      },
      setupDragging() {
        const container = this.$refs.mapContainer;
  
        container.addEventListener('mousedown', (e) => {
          this.isDragging = true;
          this.dragStart = { x: e.clientX, y: e.clientY };
        });
  
        container.addEventListener('mousemove', (e) => {
          if (!this.isDragging) return;
  
          const dx = (this.dragStart.x - e.clientX) / this.scale;
          const dy = (this.dragStart.y - e.clientY) / this.scale;
  
          this.panX += dx;
          this.panY += dy;
  
          this.dragStart = { x: e.clientX, y: e.clientY };
          this.updateViewbox();
        });
  
        container.addEventListener('mouseup', () => {
          this.isDragging = false;
        });
  
        container.addEventListener('mouseleave', () => {
          this.isDragging = false;
        });
      },
      updateViewbox() {
        if (this.svgElement) {
          this.svgElement.viewbox(
            this.panX,
            this.panY,
            this.initialViewbox.width / this.scale,
            this.initialViewbox.height / this.scale
          );
        }
      },
      resetViewbox() {
        if (this.initialViewbox) {
          this.panX = this.initialViewbox.x;
          this.panY = this.initialViewbox.y;
          this.scale = 1;
          this.updateViewbox();
        }
      },
      zoomIn() {
        this.scale = Math.min(this.scale + 0.2, 3);
        this.updateViewbox();
      },
      zoomOut() {
        this.scale = Math.max(this.scale - 0.2, 0.5);
        this.updateViewbox();
      },
      centerMap() {
        this.resetViewbox();
      },
    },
  };
  </script>
  
  <style scoped>
  .map-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    cursor: grab;
  }
  
  .map-canvas:active {
    cursor: grabbing;
  }
  </style>
  