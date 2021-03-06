import React from "react";

export default function Search({ setSearchText }) {
  function handleKeyUp(event) {
    if (event.target.value) {
      // Initiate search
      setSearchText(event.target.value.toLowerCase());
    }
    if (!event.target.value) {
      // Clear search
      setSearchText(null);
    }
  }

  return (
    <div className="mb-4">
      <input
        type="text"
        name="search"
        onKeyUp={ (e) => handleKeyUp(e) }
        className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-48 rounded-md sm:text-sm focus:ring-1"
        placeholder="Search"
        autoComplete="off"
      />
    </div>
  );
}
