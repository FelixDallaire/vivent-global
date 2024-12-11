// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import pinia from './stores/index.js'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.use(router);

app.use(pinia);

app.mount('#app');