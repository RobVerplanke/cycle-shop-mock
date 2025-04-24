import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

function ProductList() {
  const bikes = useSelector((state: RootState) => state.bikes.bikes);
  const accessoires = useSelector(
    (state: RootState) => state.accessories.accessoires
  );

  return (
    <div>
      <h1>List of bikes</h1>
      {bikes.map((bike: { id: string; name: string }) => {
        return <div key={bike.id}>{bike.name}</div>;
      })}

      <h1>List of accessoires</h1>
      {accessoires.map((accessoiry: { id: string; name: string }) => {
        return <div key={accessoiry.id}>{accessoiry.name}</div>;
      })}
    </div>
  );
}

export default ProductList;
