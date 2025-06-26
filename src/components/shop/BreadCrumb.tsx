import { useLocation } from 'react-router-dom';
import { capitalizeString } from '../../utils/helperFunctions';

export default function BreadCrumb() {
  const location = useLocation();
  const shortenedPath = location.pathname.replace('/product-category/', '');
  const path = capitalizeString(shortenedPath);

  return <span>{path}</span>;
}
