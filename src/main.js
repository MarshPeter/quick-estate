import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Paginate from "vuejs-paginate-next";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

createApp(App).use(router).use(Paginate).mount('#app');
