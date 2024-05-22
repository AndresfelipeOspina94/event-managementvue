Copiar código
<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Listado de Sesiones</h1>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th scope="col">Hora de Inicio</th>
            <th scope="col">Hora de Fin</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sesion, index) in sesiones" :key="sesion.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ sesion.titulo }}</td>
            <td>{{ sesion.descripcion }}</td>
            <td>{{ sesion.hora_inicio }}</td>
            <td>{{ sesion.hora_fin }}</td>
            <td>
              <div class="d-flex justify-content-center">
                <button @click="editSesion(sesion.id)" class="btn btn-warning mx-1">
                  <font-awesome-icon icon="pencil" />
                </button>
                <button @click="deleteSesion(sesion.id)" class="btn btn-danger mx-1">
                  <font-awesome-icon icon="trash" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center mt-4">
      <button @click="newSesion()" class="btn btn-success">
        <font-awesome-icon icon="plus" /> Nueva Sesión
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Sesiones',
  data() {
    return {
      sesiones: []
    };
  },
  methods: {
    deleteSesion(id) {
      // Corrección: Uso de backticks y comillas correctas en el título
      Swal.fire({
        title: `¿Deseas eliminar la sesión con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        position: 'center'
      }).then((result) => {
        if (result.isConfirmed) {
          // Corrección: Uso de backticks para la URL
          axios
            .delete(`http://127.0.0.1:8000/api/sesiones/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire({
                  icon: 'success',
                  title: '¡Eliminado!',
                  showConfirmButton: true,
                  timer: 2000,
                  position: 'center'
                });
                this.fetchSesiones();
              }
            })
            .catch(error => {
              console.error('Error eliminando la sesión:', error);
            });
        }
      });
    },
    editSesion(id) {
      // Corrección: Uso de backticks y corrección de la interpolación de variable en el método router push
      this.$router.push({ name: 'EditarSesion', params: { id } });
    },
    newSesion() {
      this.$router.push({ name: 'NuevaSesion' });
    },
    fetchSesiones() {
      axios
        .get('http://127.0.0.1:8000/api/sesiones')
        .then(response => {
          this.sesiones = response.data;
        })
        .catch(error => {
          console.error('Error fetching sesiones:', error);
        });
    }
  },
  mounted() {
    this.fetchSesiones();
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
