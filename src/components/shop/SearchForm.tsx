import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('search') || '');

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
  return (
    <>
      <div className="shop__search-title">Search</div>
      <div className="shop__search-form">
        <input
          value={input}
          type="text"
          placeholder="Search products..."
          onChange={onChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setInput('');
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.delete('search');
              return newParams;
            });
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}
