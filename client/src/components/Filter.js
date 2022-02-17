import React from "react";
import FilterCategory from "./FilterCategory";
import FilterOwnership from "./FilterOwnership";

export default function Filter({ filter, setFilter }) {
  return (
    <div className="sm:w-80 shrink-0">
      <FilterOwnership />
      <div className="accordion" id="accordionExample">
        {
          filter.categories.map(category => {
            return (
              <FilterCategory key={ category.name } category={ category } setFilter={ setFilter } />
            )
          })
        }
      </div>
    </div>
  );
}
