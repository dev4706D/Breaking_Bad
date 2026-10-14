import React from "react";
import CharacterItem from "./CharacterItem";
import Spinner from "../UI/Spinner";

const CharacterGrid = ({ items, isLoading, onReset }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-badge">
          <span className="element-badge">?</span>
        </div>
        <h3 className="empty-state-title">No Characters Found</h3>
        <p className="empty-state-message">
          We couldn't find any characters matching your current search or filter criteria.
        </p>
        {onReset && (
          <button type="button" className="btn btn-reset" onClick={onReset}>
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="cards">
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item} />
      ))}
    </section>
  );
};

export default CharacterGrid;
