// src/config/markerPlaceholders.js
export const markerPlaceholders = {
  "map1.svg": [
    { id: "marker1", x: 52, y: 90, name: "Placeholder 1" }, // Percentages
    { id: "marker2", x: 45, y: 60, name: "Placeholder 2" },
    { id: "marker3", x: 35, y: 45, name: "Placeholder 3" },
    { id: "marker4", x: 54, y: 38, name: "Placeholder 4" },
    { id: "marker5", x: 73, y: 40, name: "Placeholder 5" },
    { id: "marker6", x: 76, y: 62, name: "Placeholder 6" },
    { id: "marker7", x: 90, y: 87, name: "Placeholder 7" },
  ],

  "map2.svg": [
    { id: "marker1", x: (30 / 360) * 360, y: (50 / 280) * 280, name: "Main Square" },
    { id: "marker2", x: (150 / 360) * 360, y: (120 / 280) * 280, name: "Skyscraper" },
    { id: "marker3", x: (300 / 360) * 360, y: (250 / 280) * 280, name: "Park Entrance" },
  ],

  "map3.svg": [
    { id: "marker1", x: (100 / 500) * 360, y: (200 / 400) * 280, name: "Oasis" },
    { id: "marker2", x: (250 / 500) * 360, y: (300 / 400) * 280, name: "Sand Dune" },
    { id: "marker3", x: (400 / 500) * 360, y: (100 / 400) * 280, name: "Canyon" },
  ],
};
