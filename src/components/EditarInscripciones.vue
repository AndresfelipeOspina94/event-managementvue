<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Inscripción</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Inscripción
        </div>
        <div class="card-body">
          <form @submit.prevent="updateInscripcion">
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
            <button class="btn btn-primary" type="submit">Actualizar</button>
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
    name: 'EditInscripcion',
    data() {
      return {
        inscripcion: {
          id: '',  
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
      async updateInscripcion() {
      
        const res = await axios.put(`http://127.0.0.1:8000/api/inscripciones/${this.inscripcion.id}`, this.inscripcion);
        if (res.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'La inscripción ha sido actualizada',
            showConfirmButton: true,
            timer: 2000,
            position: 'center'
          });
          this.$router.push({ name: 'Inscripciones' });
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
      this.inscripcion.id = this.$route.params.id;
   
      axios.get(`http://127.0.0.1:8000/api/inscripciones/${this.inscripcion.id}`)
        .then(response => {
          this.inscripcion = response.data;
          this.fetchAsistentes();
          this.fetchSesiones();
        });
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
  