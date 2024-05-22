<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Listado de Inscripciones</h1>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Asistente</th>
              <th scope="col">Sesión</th>
              <th scope="col">Fecha de Inscripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inscripcion, index) in inscripciones" :key="inscripcion.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ inscripcion.asistente.nombre }} {{ inscripcion.asistente.apellido }}</td>
              <td>{{ inscripcion.sesion.titulo }}</td>
              <td>{{ inscripcion.fecha_inscripcion }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button @click="deleteInscripcion(inscripcion.id)" class="btn btn-danger mx-1">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center mt-4">
        <button @click="newInscripcion()" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nueva Inscripción
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Inscripciones',
    data() {
      return {
        inscripciones: []
      };
    },
    methods: {
      deleteInscripcion(id) {
        // Corrección: Uso de comillas invertidas para la interpolación de variables
        Swal.fire({
          title: `¿Deseas eliminar la inscripción con ID ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          position: 'center'
        }).then((result) => {
          if (result.isConfirmed) {
            // Corrección: Uso de comillas invertidas para la interpolación de variables
            axios
              .delete(`http://127.0.0.1:8000/api/inscripciones/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    showConfirmButton: true,
                    timer: 2000,
                    position: 'center'
                  });
                  this.fetchInscripciones();
                }
              })
              .catch(error => {
                console.error('Error eliminando la inscripción:', error);
              });
          }
        });
      },
      newInscripcion() {
        this.$router.push({ name: 'NuevaInscripcion' });
      },
      fetchInscripciones() {
        axios
          .get('http://127.0.0.1:8000/api/inscripciones')
          .then(response => {
            this.inscripciones = response.data;
          })
          .catch(error => {
            console.error('Error fetching inscripciones:', error);
          });
      }
    },
    mounted() {
      this.fetchInscripciones();
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
  