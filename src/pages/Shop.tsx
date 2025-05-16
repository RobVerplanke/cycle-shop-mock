import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Product } from '../types/Product';
import { useParams } from 'react-router-dom';

function ProductList() {
  // Determine the selected category from the url
  const { category } = useParams<{ category: string }>();

  // Collect the corresponding data
  const productList = useSelector((state: RootState) => {
    if (category === 'bicycles') return state.bicycles.productList;
    if (category === 'accessories') return state.accessories.productList;
    return [];
  });

  return (
    <div>
      <h1>List of products</h1>
      {productList.map((product: Product) => {
        return <div key={product.id}>{product.name}</div>;
      })}
    </div>
  );
}

export default ProductList;
