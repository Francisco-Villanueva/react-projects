import React, { useState, useId } from "react";
import "./Filters.css";
import { categories } from "../services/categories";
import { useFilters } from "../hooks/useFilters";
export function Filters() {
  const { filters, setFilters } = useFilters();
  // const [minPrice, setMinPrice] = useState(0);

  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  // console.log({ minPriceFilterId, categoryFilterId });
  const handleChangeMinPrice = (e) => {
    const newMinPrice = e.target.value;
    // setMinPrice(newMinPrice);
    setFilters((prevState) => ({
      ...prevState,
      minPrice: newMinPrice,
    }));
  };
  const handleChangeCategory = (e) => {
    const newCategory = e.target.value;
    // setMinPrice(newCategory);
    setFilters((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  };

  return (
    <section className="filters">
      <div>
        <label htmlFor="price">Min Price</label>
        <input
          type="range"
          id={minPriceFilterId}
          min={0}
          max={1000}
          onChange={handleChangeMinPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">All</option>
          {categories.map((m) => (
            <option value={m}>{m}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
