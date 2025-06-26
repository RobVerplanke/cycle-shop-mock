export type SortingOption =
  | 'default'
  | 'highToLow'
  | 'lowToHigh'
  | 'added'
  | 'popularity';

export type FetchBicyclesParams = {
  sort: SortingOption;
  direction?: 'asc' | 'desc';
  search?: string;
};

export type FetchAccessoriesParams = {
  sort: SortingOption;
  direction?: 'asc' | 'desc';
  search?: string;
};
