<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Listado de Ponentes</h1>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Perfil Profesional</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ponente, index) in ponentes" :key="ponente.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ ponente.nombre }}</td>
              <td>{{ ponente.apellido }}</td>
              <td>{{ ponente.perfil_profesional }}</td>
              <td>
                <div class="d-flex justify-content-center">
                  <button @click="editPonente(ponente.id)" class="btn btn-warning mx-1">
                    <font-awesome-icon icon="pencil" />
                  </button>
                  <button @click="deletePonente(ponente.id)" class="btn btn-danger mx-1">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center mt-4">
        <button @click="newPonente()" class="btn btn-success">
          <font-awesome-icon icon="plus" /> Nuevo Ponente
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'Ponentes',
    data() {
      return {
        ponentes: []
      };
    },
    methods: {
      deletePonente(id) {
        
        Swal.fire({
          title: `¿Deseas eliminar el ponente con ID ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
          position: 'center'
        }).then((result) => {
          if (result.isConfirmed) {
           
            axios
              .delete(`http://127.0.0.1:8000/api/ponentes/${id}`)
              .then(response => {
                if (response.data.success) {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    showConfirmButton: true,
                    timer: 2000,
                    position: 'center'
                  });
                  this.fetchPonentes();
                }
              })
              .catch(error => {
                console.error('Error eliminando el ponente:', error);
              });
          }
        });
      },
      editPonente(id) {
        
        this.$router.push({ name: 'EditarPonente', params: { id } });
      },
      newPonente() {
        this.$router.push({ name: 'NuevoPonente' });
      },
      fetchPonentes() {
        axios
          .get('http://127.0.0.1:8000/api/ponentes')
          .then(response => {
            this.ponentes = response.data;
          })
          .catch(error => {
            console.error('Error fetching ponentes:', error);
          });
      }
    },
    mounted() {
      this.fetchPonentes();
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