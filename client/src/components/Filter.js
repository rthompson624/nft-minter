import React from "react";
import FilterCategory from "./FilterCategory";

export default function Filter({ filter, setFilter }) {
  return (
    <div className="sm:w-48 shrink-0">
      {
        filter.map(category => {
          return (
            <FilterCategory key={ category.name } category={ category } setFilter={ setFilter } />
          )
        })
      }
    </div>
  );
}
