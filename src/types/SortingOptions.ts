export type FetchParams = {
  sort: string;
  direction: string;
  search?: string;
};

export type SortingOption = {
  text: string;
  value: string;
  sort: string;
  direction?: 'asc' | 'desc';
};
