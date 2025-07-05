import { ShopCategoriesUrl } from './Product';

export type CartItem = {
  id: number;
  type: ShopCategoriesUrl;
  name: string;
  price: string;
  quantity: number;
  image_url: string;
  size?: string;
};

export type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
};

export type CartRemoveProps = {
  id: number;
  size?: string;
};

export type UpdateQuantityPayload = {
  id: number;
  quantity: number;
  size?: string;
};
