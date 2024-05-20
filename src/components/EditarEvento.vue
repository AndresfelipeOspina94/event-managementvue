<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Evento</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Evento
      </div>
      <div class="card-body">
        <form @submit.prevent="updateEvento">
          <div class="row mb-3">
            <label for="id" class="form-label">ID</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="tag" />
              </div>
              <input type="text" class="form-control" id="id" placeholder="ID del evento" disabled v-model="evento.id" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input type="text" class="form-control" id="nombre" placeholder="Nombre del evento" v-model="evento.nombre" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="descripcion" class="form-label">Descripción</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="info-circle" />
              </div>
              <input type="text" class="form-control" id="descripcion" placeholder="Descripción del evento" v-model="evento.descripcion" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="fecha_inicio" class="form-label">Fecha de Inicio</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="calendar" />
              </div>
              <input type="date" class="form-control" id="fecha_inicio" v-model="evento.fecha_inicio" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="fecha_fin" class="form-label">Fecha de Fin</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="calendar" />
              </div>
              <input type="date" class="form-control" id="fecha_fin" v-model="evento.fecha_fin" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="ubicacion" class="form-label">Ubicación</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input type="text" class="form-control" id="ubicacion" placeholder="Ubicación del evento" v-model="evento.ubicacion" />
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
  name: 'EditarEvento',
  data() {
    return {
      evento: {
        id: 0,
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        ubicacion: ''
      }
    };
  },
  methods: {
    cancelar() {
      this.$router.push({ name: 'Eventos' });
    },
    async updateEvento() {
      const res = await axios.put(`http://127.0.0.1:8000/api/eventos/${this.evento.id}`, this.evento);
      if (res.status === 200) {
        this.$router.push({ name: 'Eventos' });
        Swal.fire({
          icon: 'success',
          title: 'El evento ha sido actualizado',
          showConfirmButton: true,
          timer: 2000,
          position: 'center' // Asegurarse de que la posición sea 'center'
        });
      }
    }
  },
  mounted() {
    this.evento.id = this.$route.params.id;
    axios.get(`http://127.0.0.1:8000/api/eventos/${this.evento.id}`)
      .then(response => {
        this.evento = response.data;
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
