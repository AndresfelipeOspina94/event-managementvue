// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import EventList from '@/components/EventList.vue';
import NewEvento from '@/components/NewEvento.vue';
import Eventos from '@/views/Eventos.vue';
import EditarEvento from '@/components/EditarEvento.vue'; 

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/create-event',
    name: 'NewEvento',
    component: NewEvento
  },
  {
    path: '/eventos',
    name: 'Eventos',
    component: Eventos
  },
  {
    path: '/editar-evento/:id',
    name: 'EditarEvento',
    component: EditarEvento
  },
  {
    path: '/nuevo-evento',
    name: 'NuevoEvento',
    component: NewEvento
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
