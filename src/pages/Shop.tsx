import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Bike } from '../types/Bike';
import { Accessoiry } from '../types/Accessoiry';

function ProductList() {
  const bikesList = useSelector((state: RootState) => state.bikes.bikesList);
  const accessoiresList = useSelector(
    (state: RootState) => state.accessories.accessoiresList
  );

  return (
    <div>
      <h1>List of bikes</h1>
      {bikesList.map((bike: Bike) => {
        return <div key={bike.id}>{bike.name}</div>;
      })}

      <h1>List of accessoires</h1>
      {accessoiresList.map((accessoiry: Accessoiry) => {
        return <div key={accessoiry.id}>{accessoiry.name}</div>;
      })}
    </div>
  );
}

export default ProductList;
