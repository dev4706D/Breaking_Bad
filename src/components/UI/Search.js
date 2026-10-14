import React, { useState } from "react";

const Search = ({
  getQuery,
  category = "All",
  setCategory,
  statusFilter = "All",
  setStatusFilter,
  totalCount = 0,
  filteredCount = 0,
}) => {
  const [text, setText] = useState("");

  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };

  const handleClear = () => {
    setText("");
    getQuery("");
  };

  const categories = ["All", "Breaking Bad", "Better Call Saul"];
  const statuses = ["All", "Alive", "Deceased", "Presumed dead"];

  return (
    <section className="search-section">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search characters by name, alias, or actor..."
            autoFocus
            value={text}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Search characters"
          />
          {text && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
              title="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <span className="filter-label">Universe:</span>
            <div className="pill-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory && setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <div className="pill-group">
              {statuses.map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`filter-pill status-${st.toLowerCase().replace(/\s+/g, "-")} ${
                    statusFilter === st ? "active" : ""
                  }`}
                  onClick={() => setStatusFilter && setStatusFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-counter">
          Showing <strong>{filteredCount}</strong> of {totalCount} characters
          {(text || category !== "All" || statusFilter !== "All") && (
            <button
              type="button"
              className="reset-filters-link"
              onClick={() => {
                handleClear();
                if (setCategory) setCategory("All");
                if (setStatusFilter) setStatusFilter("All");
              }}
            >
              Reset filters
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Search;
