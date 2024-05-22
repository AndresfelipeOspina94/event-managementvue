<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Listado de Asistentes</h1>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Tipo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asistente, index) in asistentes" :key="asistente.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ asistente.nombre }}</td>
              <td>{{ asistente.apellido }}</td>
              <td>{{ asistente.email }}</td>
              <td>{{ asistente.tipo }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button @click="editAsistente(asistente.id)" class="btn btn-warning mx-1">
                    <font-awesome-icon icon="pencil" />
                  </button>
                  <button @click="deleteAsistente(asistente.id)" class="btn btn-danger mx-1">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center mt-4">
        <button @click="newAsistente()" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Asistente
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Asistentes',
    data() {
      return {
        asistentes: []
      };
    },
    methods: {
      deleteAsistente(id) {
        Swal.fire({
          title: `¿Deseas eliminar el asistente con ID ${id}?`,  // Uso correcto de backticks
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          position: 'center'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/asistentes/${id}`)  // Uso correcto de backticks
              .then(response => {
                if (response.data.success) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    showConfirmButton: true,
                    timer: 2000,
                    position: 'center'
                  });
                  this.fetchAsistentes();
                }
              })
              .catch(error => {
                console.error('Error eliminando el asistente:', error);
              });
          }
        });
      },
      editAsistente(id) {
        this.$router.push({ name: 'EditarAsistente', params: { id } });  // Corrección de la forma de pasar parámetros
      },
      newAsistente() {
        this.$router.push({ name: 'NuevoAsistente' });
      },
      fetchAsistentes() {
        axios
          .get('http://127.0.0.1:8000/api/asistentes')
          .then(response => {
            this.asistentes = response.data;
          })
          .catch(error => {
            console.error('Error fetching asistentes:', error);
          });
      }
    },
    mounted() {
      this.fetchAsistentes();
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