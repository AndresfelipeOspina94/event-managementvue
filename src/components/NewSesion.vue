<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva Sesión</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Sesión
        </div>
        <div class="card-body">
          <form @submit.prevent="saveSesion">
            <div class="row mb-3">
              <label for="titulo" class="form-label">Título</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="book" />
                </div>
                <input type="text" class="form-control" id="titulo" placeholder="Título de la sesión" v-model="sesion.titulo" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="descripcion" class="form-label">Descripción</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="align-left" />
                </div>
                <textarea class="form-control" id="descripcion" placeholder="Descripción de la sesión" v-model="sesion.descripcion"></textarea>
              </div>
            </div>
            <div class="row mb-3">
              <label for="hora_inicio" class="form-label">Hora de Inicio</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="clock" />
                </div>
                <input type="time" class="form-control" id="hora_inicio" v-model="sesion.hora_inicio" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="hora_fin" class="form-label">Hora de Fin</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="clock" />
                </div>
                <input type="time" class="form-control" id="hora_fin" v-model="sesion.hora_fin" />
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
    name: 'NewSesion',
    data() {
      return {
        sesion: {
          titulo: '',
          descripcion: '',
          hora_inicio: '',
          hora_fin: ''
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Sesiones' });
      },
      async saveSesion() {
        const res = await axios.post('http://127.0.0.1:8000/api/sesiones', this.sesion);
        if (res.status === 201) {
          this.$router.push({ name: 'Sesiones' });
          Swal.fire({
            icon: 'success',
            title: 'La sesión ha sido creada',
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