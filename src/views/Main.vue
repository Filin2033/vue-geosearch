<template>
  <div>
    <h2>Поиск геообъектов</h2>

    <div>
      <input type="text" placeholder="Введите адрес" v-model="searchQuery" @input="onSearchInput">
    </div>

    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.place_id" @click="selectLocation(result)">
        {{ result.display_name }}
      </li>
    </ul>

    <div id="map" ref="map" style="height: 400px;"></div> 
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Импортируем стили Leaflet

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      map: null, 
      zoom: 17,
      center: [51.505, -0.09], 
      marker: null // Будем хранить объект маркера
    };
  },
  mounted() {
    // Инициализация Leaflet после монтирования компонента
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.center, this.zoom); // Инициализация карты 

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Создаем маркер и добавляем его на карту
      this.marker = L.marker(this.center).addTo(this.map);
    },
    onSearchInput() {
      if (this.searchQuery.length > 2) {
        axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: this.searchQuery,
            format: 'json',
            limit: 5 
          }
        })
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error('Ошибка при запросе к API:', error);
        });
      } else {
        this.searchResults = [];
      }
    },
    selectLocation(result) {
      this.map.setView([result.lat, result.lon], this.zoom); // Центрируем карту
      
      
      this.marker.setLatLng([result.lat, result.lon]); 
    }
  }
};
</script>