import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SearchBox = ({
  keywordSearch,
  setKeywordSearch,
  handleKeyDown,
  searchObject,
  emptyRoute,
  userType,
  prevSearch,
  setPrevSearch,
  constant,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!keywordSearch.trim() && prevSearch) {
      setPrevSearch(false);
      navigate(emptyRoute);

      dispatch({ type: constant });
    }
  }, [keywordSearch]);
  return (
    <>
      <div className="flex items-center rounded-md bg-gray-100 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="ml-1 block h-6 border-none text-black outline-none"
          type="text"
          name="q"
          placeholder={`Buscar ${searchObject}...`}
          onChange={(e) => setKeywordSearch(e.target.value)}
          value={keywordSearch}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default SearchBox;
