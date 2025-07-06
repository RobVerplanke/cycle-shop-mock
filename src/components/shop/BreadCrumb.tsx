import { Link } from 'react-router-dom';

// Show location at the top of the shop and details page
export default function BreadCrumb({
  type,
  name,
}: {
  type: string;
  name?: string;
}) {
  // Create a custom path for each category
  const path =
    type === 'bicycles' || type === 'bike'
      ? `/product-category/bicycles`
      : `/product-category/accessories`;

  // Make text presentable to display
  const CapitalizedType =
    type === 'bicycles' || type === 'bike' ? 'Bicycles' : 'Accessories';

  return (
    <span>
      <Link to="/">Home</Link> / <Link to={path}>{CapitalizedType}</Link> /{' '}
      {name}
    </span>
  );
}
