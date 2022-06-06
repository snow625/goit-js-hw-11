import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27849023-ecfc5ae512196a63a069d8b57';
export async function fetchImg(name, page) {
  return await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: `${name}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 40,
      page: `${page}`,
    },
  });
}

// *****Old*******
// export function fetchImg(name, page) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const API_KEY = '27849023-ecfc5ae512196a63a069d8b57';
//   const searchParams = new URLSearchParams({
//     key: API_KEY,
//     q: `${name}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//     per_page: 40,
//     page: `${page}`,
//   });
//   return fetch(`${BASE_URL}?${searchParams}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
