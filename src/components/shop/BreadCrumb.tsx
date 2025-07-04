import { Link } from 'react-router-dom';

export default function BreadCrumb({
  type,
  name,
}: {
  type: string;
  name?: string;
}) {
  const path =
    type === 'bicycles' || type === 'bike'
      ? `/product-category/bicycles`
      : `/product-category/accessories`;

  const CapitalizedType =
    type === 'bicycles' || type === 'bike' ? 'Bicycles' : 'Accessories';

  return (
    <span>
      <Link to="/">Home</Link> / <Link to={path}>{CapitalizedType}</Link> /{' '}
      {name}
    </span>
  );
}
