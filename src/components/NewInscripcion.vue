<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva Inscripción</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Inscripción
        </div>
        <div class="card-body">
          <form @submit.prevent="saveInscripcion">
            <div class="row mb-3">
              <label for="asistente_id" class="form-label">Asistente</label>
              <div class="input-group">
                <select class="form-select" id="asistente_id" v-model="inscripcion.asistente_id">
                  <option v-for="asistente in asistentes" :key="asistente.id" :value="asistente.id">
                    {{ asistente.nombre }} {{ asistente.apellido }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label for="sesion_id" class="form-label">Sesión</label>
              <div class="input-group">
                <select class="form-select" id="sesion_id" v-model="inscripcion.sesion_id">
                  <option v-for="sesion in sesiones" :key="sesion.id" :value="sesion.id">
                    {{ sesion.titulo }}
                  </option>
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
    name: 'NewInscripcion',
    data() {
      return {
        inscripcion: {
          asistente_id: '',
          sesion_id: ''
        },
        asistentes: [],
        sesiones: []
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Inscripciones' });
      },
      async saveInscripcion() {
        const res = await axios.post('http://127.0.0.1:8000/api/inscripciones', this.inscripcion);
        if (res.status === 201) {
          this.$router.push({ name: 'Inscripciones' });
          Swal.fire({
            icon: 'success',
            title: 'La inscripción ha sido creada',
            showConfirmButton: true,
            timer: 2000,
            position: 'center'
          });
        }
      },
      fetchAsistentes() {
        axios.get('http://127.0.0.1:8000/api/asistentes')
          .then(response => {
            this.asistentes = response.data;
          });
      },
      fetchSesiones() {
        axios.get('http://127.0.0.1:8000/api/sesiones')
          .then(response => {
            this.sesiones = response.data;
          });
      }
    },
    mounted() {
      this.fetchAsistentes();
      this.fetchSesiones();
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