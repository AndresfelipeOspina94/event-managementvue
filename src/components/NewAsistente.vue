<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Asistente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Asistente
        </div>
        <div class="card-body">
          <form @submit.prevent="saveAsistente">
            <div class="row mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre del asistente" v-model="asistente.nombre" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="apellido" class="form-label">Apellido</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input type="text" class="form-control" id="apellido" placeholder="Apellido del asistente" v-model="asistente.apellido" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="email" class="form-label">Email</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="envelope" />
                </div>
                <input type="email" class="form-control" id="email" placeholder="Email del asistente" v-model="asistente.email" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="tipo" class="form-label">Tipo</label>
              <div class="input-group">
                <select class="form-select" id="tipo" v-model="asistente.tipo">
                  <option value="estudiante">Estudiante</option>
                  <option value="profesor">Profesor</option>
                  <option value="profesional">Profesional</option>
                </select>
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
    name: 'NewAsistente',
    data() {
      return {
        asistente: {
          nombre: '',
          apellido: '',
          email: '',
          tipo: 'estudiante'
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Asistentes' });
      },
      async saveAsistente() {
        const res = await axios.post('http://127.0.0.1:8000/api/asistentes', this.asistente);
        if (res.status === 201) {
          this.$router.push({ name: 'Asistentes' });
          Swal.fire({
            icon: 'success',
            title: 'El asistente ha sido creado',
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