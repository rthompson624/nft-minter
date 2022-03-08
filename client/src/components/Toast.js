import React from "react";

export default function Toast({ toastMessage, setToastMessage }) {
  function handleButtonClick() {
    setToastMessage({ type: null, message: null });
  }

  let toast;
  switch (toastMessage.type) {
    case 'success':
      toast =
        <div className="sticky bottom-0 flex flex-col justify-center">
          <div className="bg-green-500 shadow-lg mx-auto w-80 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
              <p className="font-mono font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                </svg>
                Groovy Dudes!
              </p>
              <div className="flex items-center">
                <p className="text-white opacity-90 text-xs"></p>
                <button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" aria-label="Close" onClick={ () => handleButtonClick() }></button>
              </div>
            </div>
            <div className="p-3 bg-green-500 rounded-b-lg break-words text-white font-mono">
              { toastMessage.message }
            </div>
          </div>
        </div>;
      break;
    case 'error':
      toast =
        <div className="sticky bottom-0 flex flex-col justify-center">
          <div className="bg-red-600 shadow-lg mx-auto w-80 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3" id="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-500 rounded-t-lg">
              <p className="font-mono font-bold text-white flex items-center">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
                </svg>
                Groovy Dudes!
              </p>
              <div className="flex items-center">
                <p className="text-white opacity-90 text-xs"></p>
                <button type="button" className="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" aria-label="Close" onClick={ () => handleButtonClick() }></button>
              </div>
            </div>
            <div className="p-3 bg-red-600 rounded-b-lg break-words text-white font-mono">
              { toastMessage.message }
            </div>
          </div>
        </div>;
      break;
    default:
      toast = <div></div>;
  }
  return toast;
}
