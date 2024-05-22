// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import EventList from '@/components/EventList.vue';
import NewEvento from '@/components/NewEvento.vue';
import Eventos from '@/views/Eventos.vue';
import EditarEvento from '@/components/EditarEvento.vue';'@/components/Ponentes.vue';
import NewPonente from '@/components/NewPonente.vue';
import EditarPonente from '@/components/EditarPonente.vue';
import Asistentes from '@/components/Asistentes.vue';
import NewAsistente from '@/components/NewAsistente.vue';
import EditarAsistente from '@/components/EditarAsistente.vue';
import Sesiones from '@/components/Sesiones.vue';
import NewSesion from '@/components/NewSesion.vue';
import EditarSesion from '@/components/EditarSesion.vue';
import Inscripciones from '@/components/Inscripciones.vue';
import NewInscripcion from '@/components/NewInscripcion.vue';
import EditInscripcion from '@/components/EditInscripcion.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList
  },
  {
    path: '/eventos/nuevo',
    name: 'NewEvent',
    component: NewEvent
  },
  {
    path: '/eventos/editar/:id',
    name: 'EditEvent',
    component: EditEvent
  },
  {
    path: '/ponentes',
    name: 'Ponentes',
    component: Ponentes
  },
  {
    path: '/ponentes/nuevo',
    name: 'NewPonente',
    component: NewPonente
  },
  {
    path: '/ponentes/editar/:id',
    name: 'EditarPonente',
    component: EditarPonente
  },
  {
    path: '/asistentes',
    name: 'Asistentes',
    component: Asistentes
  },
  {
    path: '/asistentes/nuevo',
    name: 'NewAsistente',
    component: NewAsistente
  },
  {
    path: '/asistentes/editar/:id',
    name: 'EditarAsistente',
    component: EditarAsistente
  },
  {
    path: '/sesiones',
    name: 'Sesiones',
    component: Sesiones
  },
  {
    path: '/sesiones/nuevo',
    name: 'NewSesion',
    component: NewSesion
  },
  {
    path: '/sesiones/editar/:id',
    name: 'EditarSesion',
    component: EditarSesion
  },
  {
    path: '/inscripciones',
    name: 'Inscripciones',
    component: Inscripciones
  },
  {
    path: '/inscripciones/nuevo',
    name: 'NewInscripcion',
    component: NewInscripcion
  },
  {
    path: '/inscripciones/editar/:id',
    name: 'EditInscripcion',
    component: EditInscripcion
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;