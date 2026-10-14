import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Header from "./components/UI/Header";
import Search from "./components/UI/Search";
import CharacterGrid from "./components/characters/CharacterGrid";
import fallbackCharacters from "./data/characters.json";
import "./App.css";

const App = () => {
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async () => {
      setIsLoading(true);
      try {
        // Attempt to fetch from local static public file via axios
        const result = await axios.get(
          `${process.env.PUBLIC_URL || ""}/characters.json`
        );
        if (isMounted && result.data && Array.isArray(result.data)) {
          setAllItems(result.data);
        }
      } catch (error) {
        // Resilient fallback to bundled local characters dataset
        if (isMounted) {
          setAllItems(fallbackCharacters);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchItems();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter items based on search query, category, and status
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allItems.filter((item) => {
      // Search matching by Name, Nickname, or Actor
      const matchesQuery =
        !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.nickname && item.nickname.toLowerCase().includes(q)) ||
        (item.portrayed && item.portrayed.toLowerCase().includes(q));

      // Category matching
      const matchesCategory =
        category === "All" ||
        (item.category && item.category.toLowerCase().includes(category.toLowerCase()));

      // Status matching
      const matchesStatus =
        statusFilter === "All" ||
        (item.status &&
          item.status.toLowerCase().trim() === statusFilter.toLowerCase().trim());

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [allItems, query, category, statusFilter]);

  const handleReset = () => {
    setQuery("");
    setCategory("All");
    setStatusFilter("All");
  };

  return (
    <div className="container">
      <Header />
      <Search
        getQuery={(q) => setQuery(q)}
        category={category}
        setCategory={setCategory}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        totalCount={allItems.length}
        filteredCount={filteredItems.length}
      />
      <CharacterGrid
        isLoading={isLoading}
        items={filteredItems}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
