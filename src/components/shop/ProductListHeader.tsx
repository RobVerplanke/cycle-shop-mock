import { sortingOptions } from '../../library/sortingOptions';
import { ProductItem } from '../../types/Product';

type GridHeaderProps = {
  productList: ProductItem[];
  searchParams: URLSearchParams;
  setSearchParams: (
    next: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)
  ) => void;
};

export default function ProductGridHeader({
  productList,
  searchParams,
  setSearchParams,
}: GridHeaderProps) {
  //Determine selected sorting method
  const currentSortParam = searchParams.get('sort') ?? 'added';
  const currentDirectionParam = searchParams.get('direction') ?? 'desc';

  // If price is selected as sorting option, also determine the sorting direction
  const currentOption =
    sortingOptions.find((opt) => {
      if (opt.sort === 'price') {
        return (
          opt.sort === currentSortParam &&
          opt.direction === currentDirectionParam
        );
      }
      return opt.sort === currentSortParam;
    }) ?? sortingOptions[0]; // fallback

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selected = sortingOptions.find((o) => o.value === e.target.value);

    if (!selected) return;

    // Set parameters after sort option change
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set('sort', selected.sort);

      // Direction only for price option
      if (selected.sort === 'price' && selected.direction) {
        params.set('direction', selected.direction);
      } else {
        params.delete('direction');
      }

      return params;
    });
  }

  return (
    <>
      {/* Show the amount of items displayed. If only one item is loaded, adjust the message */}
      <div className="shop__header-results">
        {productList.length === 0 && <p>No results</p>}
        {productList.length === 1 && <p>Showing the single result</p>}
        {productList.length > 1 && (
          <p>Showing all {productList.length} results</p>
        )}
      </div>

      {/* Create a selection input field with generic options */}
      <div className="shop__header-sort">
        {productList.length >= 1 && (
          <select value={currentOption.value} onChange={handleSortChange}>
            {sortingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
}
