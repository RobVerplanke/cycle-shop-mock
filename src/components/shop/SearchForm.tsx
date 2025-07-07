import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('search') || '');
  const { category } = useParams();

  useEffect(() => {
    setInput('');
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('search');
      return newParams;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (input.trim()) {
        newParams.set('search', input.trim());
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
  }

  function handleClear() {
    setInput('');
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('search');
      return newParams;
    });
  }

  return (
    <>
      <div className="shop__search-title" id="search-label">
        Search
      </div>
      <form
        className="shop__search-form"
        onSubmit={handleSubmit}
        role="search"
        aria-labelledby="search-label"
      >
        <label htmlFor="product-search" className="visually-hidden">
          Search for products
        </label>
        <input
          id="product-search"
          value={input}
          type="text"
          placeholder="Search products..."
          onChange={onChange}
          aria-describedby="search-helptext"
        />
        <div id="search-helptext" className="visually-hidden">
          Enter a product name and press Search
        </div>
        <button type="submit" aria-label="Submit search">
          Search
        </button>
        <button type="button" onClick={handleClear} aria-label="Clear search">
          Clear
        </button>
      </form>
    </>
  );
}
