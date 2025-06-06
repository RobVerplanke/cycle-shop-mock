export type Bicycle = {
  id: number;
  type: string;
  name: string;
  introduction: string;
  description: string;
  price: number;
  image_url: string;
};

export type Accessory = {
  id: number;
  type: string;
  name: string;
  introduction: string;
  description: string;
  category: string;
  image_url: string;
};

export type ProductItem = Bicycle | Accessory;

export type Variant = {
  id: number;
  accessory_id: number;
  size: string;
  price: number;
};

export type ShopCategories = 'bicycles' | 'accessories';

export type PriceFilterProps = {
  category: ShopCategories | undefined;
  productList: ProductItem[];
  variantsList: Variant[];
};
