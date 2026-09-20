const API_BASE_URL ="https://api.themoviedb.org/3";

const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS={
    method :'GET',
    headers:{
      accept:'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

export {API_BASE_URL , API_OPTIONS}