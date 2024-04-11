//https://api.themoviedb.org/3/movie/now_playing?api_key=27de0244af6b689982af0d77e6fa633b&language=pt-BR
//base da url: https://api.themoviedb.org/3

import axios from "axios";

const api = axios.create({baseURL: 'https://api.themoviedb.org/3/'});

export default api;