export type Bicycle = {
  id: number;
  type: string;
  name: string;
  introduction: string;
  description: string;
  avg_rating: number;
  price: number;
  image_url: string;
};

export type PriceVariantsProps = {
  id: number;
  price: number;
  size: 'L' | 'M' | 'XL';
}[];

export type Accessory = {
  id: number;
  type: string;
  name: string;
  introduction: string;
  description: string;
  avg_rating: number;
  category: string;
  image_url: string;
  prices: PriceVariantsProps;
};

export type ProductItem = Bicycle | Accessory;

export type Price = {
  id: number;
  accessory_id: number;
  size: string;
  price: number;
};

export type PriceFilterProps = Bicycle[] | Price[];

export type ShopCategories = 'bicycles' | 'accessories';
