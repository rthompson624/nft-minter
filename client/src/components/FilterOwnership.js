import React from "react";

export default function FilterOwnership() {
  return (
    <div className="flex justify-center ml-2 my-3">
      <div className="form-check form-check-inline">
        <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="inlineRadio1">All</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="inlineRadio2">Minted</label>
      </div>
      <div className="form-check form-check-inline">
        <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
        <label className="form-check-label inline-block text-gray-800 font-mono" htmlFor="inlineRadio3">Available</label>
      </div>
    </div>
    );
}
