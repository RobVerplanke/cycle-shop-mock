export type FetchParams = {
  sort: string;
  direction?: 'asc' | 'desc';
  search?: string;
};

export type SortingOption = {
  text: string;
  value: string;
  sort: string;
  direction?: 'asc' | 'desc';
};
