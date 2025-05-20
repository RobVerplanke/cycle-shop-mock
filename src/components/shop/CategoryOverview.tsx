// CategoryOverview.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';

const categories = [
  { key: 'bicycles', label: 'Bicycles' },
  { key: 'accessories', label: 'Accessories' },
];

// Returns all categories with the total amount of items in it
function CategoryOverview() {
  const bicycles = useSelector(
    (state: RootState) => state.bicycles.productList
  );
  const accessories = useSelector(
    (state: RootState) => state.accessories.productList
  );

  const productCounts: Record<string, number> = {
    bicycles: bicycles.length,
    accessories: accessories.length,
  };

  return (
    <ul>
      {categories.map((cat) => (
        <li key={cat.key}>
          <Link to={`/product-category/${cat.key}`}>{cat.label}</Link> (
          {productCounts[cat.key]})
        </li>
      ))}
    </ul>
  );
}

export default CategoryOverview;
