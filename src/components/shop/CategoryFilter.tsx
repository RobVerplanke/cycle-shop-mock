// CategoryOverview.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { ShopCategories } from '../../types/Product';

// Returns all categories with the total amount of items in it
function CategoryFilter() {
  // Get the length of the selected product list
  const bicycleCount = useSelector(
    (state: RootState) => state.bicycles.bicycles.length
  );
  const accessoryCount = useSelector(
    (state: RootState) => state.accessories.accessories.length
  );

  // Create an object to map over
  const categories: { key: ShopCategories; label: string; count: number }[] = [
    { key: 'bicycles', label: 'Bicycles', count: bicycleCount },
    { key: 'accessories', label: 'Accessories', count: accessoryCount },
  ];

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat.key}>
          <Link to={`/product-category/${cat.key}`}>{cat.label}</Link>(
          {cat.count})
        </li>
      ))}
    </ul>
  );
}

export default CategoryFilter;
