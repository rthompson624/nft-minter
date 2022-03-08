import React from "react";

export default function ModalSpinner({ spinnerConfig }) {
  if (spinnerConfig.show) {
    return (
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-70 bg-slate-300">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="flex flex-col justify-center items-center w-72 h-40">
              <div className="spinner-grow inline-block w-16 h-16 bg-current rounded-full opacity-0 text-green-500" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="font-mono font-bold text-center text-lg mt-5">{ spinnerConfig.message }...</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}
