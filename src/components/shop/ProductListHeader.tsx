import { sortingOptions } from '../../library/sortingOptions';
import { SortingOption } from '../../types/SortingOptions';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ShopCategories } from '../../types/Product';

export default function ProductGridHeader({
  category,
  activeSortingOption,
  setActiveSortingOption,
}: {
  category: ShopCategories;
  activeSortingOption: SortingOption | undefined;
  setActiveSortingOption: React.Dispatch<React.SetStateAction<SortingOption>>;
}) {
  // Get product data
  const bicycles = useSelector((state: RootState) => state.bicycles.bicycles);
  const accessories = useSelector(
    (state: RootState) => state.accessories.accessories
  );

  // Determine which products must be displayed, based on the choosen category
  const productList =
    category === 'bicycles'
      ? bicycles
      : category === 'accessories'
      ? accessories
      : [];

  // Change sorting option
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setActiveSortingOption(e.target.value as SortingOption);
  }

  return (
    <>
      {/* Show the amount of items displayed. If only one item is loaded, adjust the message */}
      <div className="shop__header-results">
        {productList.length === 1 ? (
          <p>Showing the single result </p>
        ) : (
          <p>Showing all {productList.length} results</p>
        )}
      </div>

      {/* Create a selection input field with generic options */}
      <div className="shop__header-sort">
        <select value={activeSortingOption} onChange={onChange}>
          {sortingOptions.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
