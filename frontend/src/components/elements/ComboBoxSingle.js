import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const ComboBoxSingle = ({
  name,
  data,
  setFilter,
  setSelect,
  setAction,
  selectedItem,
  createOptionModal = false,
  createOptionLink = false,
  classDiv,
  classSpan,
  childrenModal,
  children,
  title,
}) => {
  const [viewModal, setViewModal] = useState(false);
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
    setAction !== undefined && setAction(name, element._id);
    setSearch("");
  }
  const handleArrow = () => {
    if (search.length > 0 || toggle) setSearch("");
    setToggle(!toggle);
  };

  return [
    <div className="relative w-full" key={0}>
      <div className="flex items-center justify-between">
        <span className={"flex font-medium  " + classSpan}>{title}:</span>
        {createOptionModal ? (
          <button
            onClick={() => setViewModal(true)}
            type="button"
            className="px-3 py-1 text-sm font-semibold hover:rounded-full hover:bg-blue-gray-700 hover:text-white"
          >
            {createOptionModal}
          </button>
        ) : (
          createOptionLink && (
            <Link to={createOptionLink.url} className="text-sm font-semibold">
              {createOptionLink.title}
            </Link>
          )
        )}
      </div>
      {createOptionModal && viewModal && childrenModal && (
        <Modal
          closeAction={() => setViewModal(false)}
          title={createOptionModal}
        >
          {childrenModal}
        </Modal>
      )}
      <div className="relative">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="w-full rounded-md border-2 p-2 outline-none"
          onClick={() => setToggle(!toggle)}
        />
        <div
          className="absolute bottom-4 right-0 flex cursor-pointer items-center  pr-2 opacity-50 hover:opacity-100"
          onClick={() => handleArrow()}
        >
          {search.length > 0 || toggle ? <FaCaretUp /> : <FaCaretDown />}
        </div>
      </div>
      {(search.length > 0 || toggle) && (
        <div className="absolute z-20 mt-1 max-h-[50vh] w-full overflow-y-scroll rounded-md bg-white p-2 shadow">
          {viewData?.map((element, key) => (
            <button
              className="hover:bg-palette-ext flex w-full items-center gap-2 rounded-md p-1"
              type="button"
              onClick={() => selectHandle(element)}
              key={key}
            >
              {element.images && (
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
              )}
              <span className="text-xl">{element.name}</span>
              {selectedItem && selectedItem === element._id && (
                <span className="text-blue-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
      {children}
    </div>,
  ];
};

export default ComboBoxSingle;
