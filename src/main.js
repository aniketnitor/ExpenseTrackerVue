import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import axios from 'axios';
import router from './router';
import store from './store';

axios.defaults.baseURL = 'http://localhost:8080'; 


createApp(App).use(store).use(router).mount('#app')

