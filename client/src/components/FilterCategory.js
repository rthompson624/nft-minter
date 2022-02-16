import React from "react";

export default function FilterCategory({ category, setFilter }) {
  function handleCheckboxChange(event) {
    setFilter(prevFilter => {
      return prevFilter.map(categoryIter => {
        if (categoryIter.name === category.name) {
          return {
            ...categoryIter,
            options: categoryIter.options.map(optionIter => {
              if (optionIter.name === event.target.value) {
                return {
                  ...optionIter,
                  selected: !optionIter.selected
                };
              } else {
                return optionIter;
              }
            })
          };
        } else {
          return categoryIter;
        }
      });
    });
  }

  function formatName(name) {
    return name.replace(/\s/g, '').toLowerCase();
  }

  return (
    <div className="accordion-item bg-white border border-gray-200">
      <h2 className="accordion-header mb-0 font-mono" id={ `heading${category.name}` }>
        <button
          className="
            accordion-button
            collapsed
            relative
            flex
            items-center
            w-full
            py-4
            px-5
            text-base text-gray-800 text-left
            bg-white
            border-0
            rounded-none
            transition
            focus:outline-none
          "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={ `#collapse${category.name}` }
          aria-expanded="false"
          aria-controls={ `collapse${category.name}` }
        >
          { category.name }
        </button>
      </h2>
      <div
        id={ `collapse${category.name}` }
        className="accordion-collapse collapse"
        aria-labelledby={ `heading${category.name}` }
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body py-4 px-5">
          {
            category.options.map(option => {
              return (
                <div key={ option.name }>
                  <input
                    type="checkbox"
                    id={ formatName(option.name) }
                    name={ formatName(option.name) }
                    value={ option.name }
                    checked={ option.selected }
                    onChange={ (e) => handleCheckboxChange(e) }
                  />
                  <label htmlFor={ formatName(option.name) } className="ml-2 font-mono">{ option.name }</label>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
