<template>
  <div>

    <h2>Поиск геообъектов</h2>
    <div class="adresa">
        <div>
        <el-input type="text" placeholder="Введите адрес" v-model="searchQuery" @input="onSearchInput"></el-input>
      </div>

      <ul v-if="searchResults.length">
        <li v-for="result in searchResults" :key="result.place_id" @click="selectLocation(result)" class="adres">
          {{ result.display_name }}
        </li>
      </ul>
    </div>
    
    <div class="map">
      <div id="map" ref="map"></div> 
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      map: null, 
      zoom: 17,
      center: [51.505, -0.09], 
      marker: null 
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView(this.center, this.zoom);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
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
      this.map.setView([result.lat, result.lon], this.zoom); 
      this.marker.setLatLng([result.lat, result.lon]); 
    }
  }
};
</script>

<style scoped>
#map {
  width: 1000px;
  height: 400px;
  border: 3px solid rgb(43, 43, 43);
}
.map {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.adres {
  list-style: none;
  padding: 8px 12px;
  border: 1px solid rgb(216, 216, 216);
  margin-top: 5px;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
}
.adres:hover {
  background-color: #e9e9e9;
}
ul {
  padding-inline-start: 0;
}
.adresa {
  display: flex;
  flex-direction: column;
  padding: 0 20%;
}
</style>