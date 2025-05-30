export const API_BASE_URL = 'https://cycle-shop-server-xe3d.onrender.com';

export const PRODUCTS_ENDPOINTS = {
  bicycles: {
    default: `${API_BASE_URL}/products/bikes`,
    lowToHigh: `${API_BASE_URL}/products/bikes/sorted?by=price&direction=asc`,
    highToLow: `${API_BASE_URL}/products/bikes/sorted?by=price&direction=desc`,
    added: `${API_BASE_URL}/products/bikes/sorted?by=added`,
    popularity: `${API_BASE_URL}/products/bikes/sorted?by=popularity`,
    rating: `${API_BASE_URL}/products/bikes/sorted?by=rating`,
  },
  accessories: {
    default: `${API_BASE_URL}/products/accessories`,
    lowToHigh: `${API_BASE_URL}/products/accessories/sorted?by=price&direction=asc`,
    highToLow: `${API_BASE_URL}/products/accessories/sorted?by=price&direction=desc`,
    added: `${API_BASE_URL}/products/accessories/sorted?by=added`,
    popularity: `${API_BASE_URL}/products/accessories/sorted?by=popularity`,
    rating: `${API_BASE_URL}/products/accessories/sorted?by=rating`,
  },
  variants: `${API_BASE_URL}/products/accessory-prices`,
  reviews: `${API_BASE_URL}/reviews`,
};
