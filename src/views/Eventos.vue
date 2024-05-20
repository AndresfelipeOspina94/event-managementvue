<template>
  <div class="container">
    <h1 class="text-start">Listado de Eventos
      <button @click="newEvent()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Fecha de Inicio</th>
            <th scope="col">Fecha de Fin</th>
            <th scope="col">Ubicación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(evento, index) in eventos" :key="index">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ evento.nombre }}</td>
            <td>{{ evento.descripcion }}</td>
            <td>{{ evento.fecha_inicio }}</td>
            <td>{{ evento.fecha_fin }}</td>
            <td>{{ evento.ubicacion }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <button @click="deleteEvent(evento.id)" class="btn btn-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
                <button @click="editEvent(evento.id)" class="btn btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Eventos',
  data() {
    return {
      eventos: []
    };
  },
  methods: {
    deleteEvent(id) {
      Swal.fire({
        title: `¿Deseas eliminar el evento con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        position: 'center'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/api/eventos/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire({
                  icon: 'success',
                  title: '¡Eliminado!',
                  showConfirmButton: true,
                  timer: 2000,
                  position: 'center'
                });
                this.fetchEvents();
              }
            })
            .catch(error => {
              console.error('Error eliminando el evento:', error);
            });
        }
      });
    },
    editEvent(id) {
      this.$router.push({ name: 'EditarEvento', params: { id: `${id}` } });
    },
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

.table th,
.table td {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
}
</style>
