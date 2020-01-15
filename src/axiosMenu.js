import axios from 'axios';

const axiosMenu = axios.create({
  baseURL:  'https://burger-buildr.firebaseio.com/'
});

export default axiosMenu;