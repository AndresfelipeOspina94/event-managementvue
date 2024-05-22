<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Sesión</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Sesión
        </div>
        <div class="card-body">
          <form @submit.prevent="updateSesion">
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
  name: 'EditarSesion',
  data() {
    return {
      sesion: {
        id: 0,
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
    async updateSesion() {
      // Corrección: Uso de backticks para permitir la interpolación de variables
      const res = await axios.put(`http://127.0.0.1:8000/api/sesiones/${this.sesion.id}`, this.sesion);
      if (res.status === 200) {
        await Swal.fire({
          icon: 'success',
          title: 'La sesión ha sido actualizada',
          showConfirmButton: true,
          timer: 2000,
          position: 'center'
        });
        this.$router.push({ name: 'Sesiones' });
      }
    }
  },
  mounted() {
    this.sesion.id = this.$route.params.id;
    // Corrección: Uso de backticks para permitir la interpolación de variables
    axios.get(`http://127.0.0.1:8000/api/sesiones/${this.sesion.id}`)
      .then(response => {
        this.sesion = response.data;
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
