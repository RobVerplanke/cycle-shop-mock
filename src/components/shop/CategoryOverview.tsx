// CategoryOverview.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { ShopCategories } from '../../types/Product';

const categories: { key: ShopCategories; label: string }[] = [
  { key: 'bicycles', label: 'Fietsen' },
  { key: 'accessories', label: 'Accessoires' },
];

// Returns all categories with the total amount of items in it
function CategoryOverview() {
  const productCounts = useSelector((state: RootState) => ({
    bicycles: state.products.productList.bicycles.length,
    accessories: state.products.productList.accessories.length,
  }));

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
