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
    <div className="border-b-2 pb-3 font-mono">
      <div className="text-lg font-bold px-3 pt-3 pb-1">{ category.name }</div>
      <div className="px-3">
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
                <label htmlFor={ formatName(option.name) } className="ml-2">{ option.name }</label>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
