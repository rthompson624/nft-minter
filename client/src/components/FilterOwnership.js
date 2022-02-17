import React from "react";

export default function FilterOwnership({ filter, setFilter }) {
  function handleRadioGroupChange(event) {
    setFilter(prevFilter => ({ ...prevFilter, ownership: event.target.value }));
  }

  return (
    <div className="flex justify-center ml-2 my-3">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="ownership"
          id="ownershipOptionAll"
          value="all"
          checked={ filter.ownership === 'all' }
          onChange={ (e) => handleRadioGroupChange(e) }
        />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="ownershipOptionAll">All</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="ownership"
          id="ownershipOptionMinted"
          value="minted"
          checked={ filter.ownership === 'minted' }
          onChange={ (e) => handleRadioGroupChange(e) }
        />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="ownershipOptionMinted">Minted</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="ownership"
          id="ownershipOptionAvailable"
          value="available"
          checked={ filter.ownership === 'available' }
          onChange={ (e) => handleRadioGroupChange(e) }
        />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="ownershipOptionAvailable">Available</label>
      </div>
    </div>
    );
}
