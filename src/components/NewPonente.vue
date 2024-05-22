<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Ponente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Ponente
        </div>
        <div class="card-body">
          <form @submit.prevent="savePonente">
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre del ponente" v-model="ponente.nombre" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="apellido" placeholder="Apellido del ponente" v-model="ponente.apellido" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="perfil_profesional" class="form-label">Perfil Profesional</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="briefcase" />
                </div>
                <input type="text" class="form-control" id="perfil_profesional" placeholder="Perfil Profesional del ponente" v-model="ponente.perfil_profesional" />
              </div>
            </div>
            <button class="btn btn-primary" type="submit">Guardar</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'NewPonente',
    data() {
      return {
        ponente: {
          nombre: '',
          apellido: '',
          perfil_profesional: ''
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Ponentes' });
      },
      async savePonente() {
        const res = await axios.post('http://127.0.0.1:8000/api/ponentes', this.ponente);
        if (res.status === 201) {
          this.$router.push({ name: 'Ponentes' });
          Swal.fire({
            icon: 'success',
            title: 'El ponente ha sido creado',
            showConfirmButton: true,
            timer: 2000,
            position: 'center'
          });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  .card-header {
    background-color: #f8f9fa;
  }
  .input-group-text {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>