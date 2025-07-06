import { SortingOption } from '../types/SortingOptions';

// Set content for the sorting options selection
export const sortingOptions: SortingOption[] = [
  { text: 'Default sorting', value: 'default', sort: 'added' },
  { text: 'Sort by popularity', value: 'popularity', sort: 'popularity' },
  { text: 'Sort by average rating', value: 'rating', sort: 'rating' },
  { text: 'Sort by latest', value: 'added', sort: 'added' },
  {
    text: 'Sort by price: high to low',
    value: 'highToLow',
    sort: 'price',
    direction: 'desc',
  },
  {
    text: 'Sort by price: low to high',
    value: 'lowToHigh',
    sort: 'price',
    direction: 'asc',
  },
];
