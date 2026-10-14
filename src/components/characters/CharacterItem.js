import React, { useState } from "react";

const CharacterItem = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  const getStatusClass = (status) => {
    if (!status) return "status-unknown";
    const s = status.toLowerCase();
    if (s.includes("alive")) return "status-alive";
    if (s.includes("deceased")) return "status-deceased";
    if (s.includes("presumed")) return "status-presumed";
    return "status-unknown";
  };

  const getInitials = (name) => {
    if (!name) return "BB";
    const parts = name.split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`
      : name.slice(0, 2).toUpperCase();
  };

  const occupations = Array.isArray(item.occupation)
    ? item.occupation
    : item.occupation
    ? [item.occupation]
    : [];

  const seasons = Array.isArray(item.appearance)
    ? item.appearance.join(", ")
    : item.appearance || "N/A";

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={`Character card for ${item.name}. Click to view details.`}
    >
      <div className="card-inner">
        {/* Card Front */}
        <div className="card-front">
          {imgError ? (
            <div className="card-fallback-avatar">
              <div className="fallback-element">
                <span className="element-atomic">{item.char_id || 35}</span>
                <span className="element-symbol">{getInitials(item.name)}</span>
              </div>
              <span className="fallback-name">{item.name}</span>
            </div>
          ) : (
            <img
              src={item.img}
              alt={item.name}
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}

          <div className="card-front-overlay">
            <span className={`status-badge-front ${getStatusClass(item.status)}`}>
              <span className="status-dot"></span>
              {item.status}
            </span>
            <div className="front-title-container">
              <h2 className="front-character-name">{item.name}</h2>
              {item.nickname && (
                <span className="front-character-nickname">"{item.nickname}"</span>
              )}
            </div>
            <div className="flip-hint">
              <span>Flip for details</span> &gt;
            </div>
          </div>
        </div>

        {/* Card Back */}
        <div className="card-back">
          <div className="card-back-header">
            <div className="back-element-chip">
              <span className="element-atomic">{item.char_id || 35}</span>
              <span className="element-symbol">{getInitials(item.name)}</span>
            </div>
            <div className="back-header-text">
              <h2 className="back-character-name">{item.name}</h2>
              {item.nickname && (
                <div className="back-alias">a.k.a. {item.nickname}</div>
              )}
            </div>
          </div>

          <ul className="character-details-list">
            <li>
              <strong>Portrayed by:</strong>
              <span>{item.portrayed || "Unknown"}</span>
            </li>
            <li>
              <strong>Birthday:</strong>
              <span>{item.birthday || "Unknown"}</span>
            </li>
            <li>
              <strong>Status:</strong>
              <span className={`status-pill ${getStatusClass(item.status)}`}>
                <span className="status-dot"></span>
                {item.status || "Unknown"}
              </span>
            </li>
            {item.category && (
              <li>
                <strong>Category:</strong>
                <span className="category-tag">{item.category}</span>
              </li>
            )}
            {seasons && seasons !== "N/A" && (
              <li>
                <strong>Seasons:</strong>
                <span>Season {seasons}</span>
              </li>
            )}
            {occupations.length > 0 && (
              <li className="occupations-item">
                <strong>Occupation:</strong>
                <div className="occupations-tags">
                  {occupations.slice(0, 3).map((occ, idx) => (
                    <span key={idx} className="occ-tag">
                      {occ}
                    </span>
                  ))}
                </div>
              </li>
            )}
          </ul>

          <div className="card-back-footer">
            <span className="back-flip-hint">&lt; Tap to return</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
