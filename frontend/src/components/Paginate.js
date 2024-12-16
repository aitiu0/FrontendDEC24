import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Paginate = ({
  page,
  pages,
  baseRoute,
  keyword = "",
  sort = "",
  order = "",
  constant,
}) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const changePage = () => {
    dispatch({ type: constant });
  };
  return (
    <>
      <div className="xs:flex-row xs:justify-between flex flex-col items-center border-t bg-white px-5 py-5          ">
        <span className="xs:text-sm text-xs text-gray-900">
          Mostrando pagina {page} de {pages} paginas
        </span>
        <div className="xs:mt-0 mt-2 inline-flex">
          {page > 1 && (
            <Link
              className="rounded-l bg-blue-600 py-2 px-4 text-sm font-semibold text-blue-50 transition duration-150 hover:bg-blue-500"
              to={
                keyword
                  ? sort && order
                    ? baseRoute +
                      `/search/${keyword}/sort/${sort}/order/${order}/page/${
                        page - 1
                      }`
                    : baseRoute + `/search/${keyword}/page/${page - 1}`
                  : sort && order
                  ? baseRoute + `/sort/${sort}/order/${order}/page/${page - 1}`
                  : baseRoute + `/page/${page - 1}`
              }
              onClick={changePage}
            >
              Previo
            </Link>
          )}
          &nbsp; &nbsp;
          {page < pages && (
            <Link
              className="rounded-r bg-blue-600 py-2 px-4 text-sm font-semibold text-blue-50 transition duration-150 hover:bg-blue-500"
              to={
                keyword
                  ? sort && order
                    ? baseRoute +
                      `/search/${keyword}/sort/${sort}/order/${order}/page/${
                        page + 1
                      }`
                    : baseRoute + `/search/${keyword}/page/${page + 1}`
                  : sort && order
                  ? baseRoute + `/sort/${sort}/order/${order}/page/${page + 1}`
                  : baseRoute + `/page/${page + 1}`
              }
              onClick={changePage}
            >
              Siguiente
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Paginate;
