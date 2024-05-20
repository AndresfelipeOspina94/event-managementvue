<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Eventos Destacados</h1>
    <div class="row">
      <div v-for="evento in eventos" :key="evento.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ evento.nombre }}</h5>
            <p class="card-text">{{ evento.descripcion }}</p>
          </div>
          <div class="card-footer bg-success text-white">
            <p class="mb-0">Fecha de Inicio: {{ evento.fecha_inicio }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button @click="newEvent()" class="btn btn-success">
        <font-awesome-icon icon="plus" /> Nuevo Evento
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EventList',
  data() {
    return {
      eventos: []
    };
  },
  methods: {
    newEvent() {
      this.$router.push({ name: 'NuevoEvento' });
    },
    fetchEvents() {
      axios
        .get('http://127.0.0.1:8000/api/eventos')
        .then(response => {
          this.eventos = response.data;
        })
        .catch(error => {
          console.error('Error fetching eventos:', error);
        });
    }
  },
  mounted() {
    this.fetchEvents();
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.card-footer {
  background-color: #28a745;
  color: #ffffff;
  text-align: center;
}
</style>
