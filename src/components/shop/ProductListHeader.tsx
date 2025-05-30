import { ProductItem } from '../../types/Product';
import { sortingOptions } from '../../library/sortingOptions';

export default function ProductListHeader({
  productList,
  sortingOption,
  setSortingOption,
}: {
  productList: ProductItem[];
  sortingOption: string;
  setSortingOption: React.Dispatch<React.SetStateAction<string>>;
}) {
  // Change sorting option
  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortingOption(e.target.value);
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
        <select value={sortingOption} onChange={onChange}>
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
