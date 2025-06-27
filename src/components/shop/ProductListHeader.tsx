import { sortingOptions } from '../../library/sortingOptions';
import { ProductItem } from '../../types/Product';

type Props = {
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
}: Props) {
  const currentSortParam = searchParams.get('sort') ?? 'added';
  const currentDirectionParam = searchParams.get('direction') ?? 'desc';

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
        {productList.length === 1 ? (
          <p>Showing the single result </p>
        ) : (
          <p>Showing all {productList.length} results</p>
        )}
      </div>

      {/* Create a selection input field with generic options */}
      <div className="shop__header-sort">
        <select value={currentOption.value} onChange={handleSortChange}>
          {sortingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
