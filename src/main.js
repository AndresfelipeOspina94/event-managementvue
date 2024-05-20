import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBank, faBuilding, faPencil, faPhone, faPlus, faTag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'; // Corregir faBulding a faBuilding
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

library.add(faPhone, faUser, faTrash, faTag, faBuilding, faPencil, faPlus);

import '@popperjs/core';

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app');