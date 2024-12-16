import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ComboBox = ({ data, setFilter, setSelect, setAction, selectedItems }) => {
  const [viewData, setViewData] = useState(data);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setFilter !== undefined && setFilter(search);
    let newData = data;

    if (search.length > 0) {
      newData = newData.filter((element) =>
        element.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setViewData(newData);
  }, [search, data, setFilter]);

  function selectHandle(element) {
    setSelect !== undefined && setSelect(element.name);
    setSearch("");
    setAction(element);
  }
  const handleArrow = () => {
    if (search.length > 0 || toggle) setSearch("");
    setToggle(!toggle);
  };

  return [
    <div className="relative w-full" key={0}>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="w-full rounded-md border-2 p-2 outline-none"
        onClick={() => setToggle(!toggle)}
      />
      <div
        className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 opacity-50 hover:opacity-100"
        onClick={() => handleArrow()}
      >
        {search.length > 0 || toggle ? <FaCaretUp /> : <FaCaretDown />}
      </div>
      {(search.length > 0 || toggle) && (
        <div className="absolute z-20 mt-1 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-white p-2 shadow">
          {viewData.map((element, key) => (
            <button
              className="hover:bg-palette-ext flex w-full items-center gap-2 rounded-md p-1"
              type="button"
              onClick={() => selectHandle(element)}
              key={key}
            >
              <img
                src={
                  element.logo
                    ? element.logo.url
                    : element.images && element.images[0]
                    ? element.images[0].url
                    : ""
                }
                alt={element.name}
                className="h-5 w-5 rounded-full"
              />
              <span className="text-xl">{element.name}</span>
              {selectedItems && selectedItems.includes(element._id) && (
                <span className="text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
  ];
};

export default ComboBox;
