export const API_BASE_URL = 'https://cycle-shop-server-xe3d.onrender.com';

export const PRODUCTS_ENDPOINTS = {
  bicycles: {
    default: `${API_BASE_URL}/products/bike/sorted?by=added`,
    lowToHigh: `${API_BASE_URL}/products/bike/sorted?by=price&direction=asc`,
    highToLow: `${API_BASE_URL}/products/bike/sorted?by=price&direction=desc`,
    added: `${API_BASE_URL}/products/bike/sorted?by=added`,
    popularity: `${API_BASE_URL}/products/bike/sorted?by=popularity`,
    rating: `${API_BASE_URL}/products/bike/sorted?by=rating`,
  },
  accessories: {
    default: `${API_BASE_URL}/products/accessory/sorted?by=added`,
    lowToHigh: `${API_BASE_URL}/products/accessory/sorted?by=price&direction=asc`,
    highToLow: `${API_BASE_URL}/products/accessory/sorted?by=price&direction=desc`,
    added: `${API_BASE_URL}/products/accessory/sorted?by=added`,
    popularity: `${API_BASE_URL}/products/accessory/sorted?by=popularity`,
    rating: `${API_BASE_URL}/products/accessory/sorted?by=rating`,
  },
};
