import axios from 'axios';

const items = () => {
  return axios.get(
    `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`
  );
};

export default { items };