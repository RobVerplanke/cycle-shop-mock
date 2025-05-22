import { PRODUCTS_ENDPOINTS } from '../library/api/api';

export default async function GetPrices() {
  try {
    const response = await fetch(`${PRODUCTS_ENDPOINTS.prices}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
}
