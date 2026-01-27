import axios from 'axios';

const API_KEY = '54242679-4f176982105516e8b81b54235';
const BASE_URL = 'https://pixabay.com/api/';

export const getImagesByQuery = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,      
      per_page: 15,    
    },
  });
  return response.data;
};