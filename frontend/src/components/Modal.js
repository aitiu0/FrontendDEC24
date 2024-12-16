import React from "react";
import { MdClose } from "react-icons/md";
import { useMaterialTailwindController, setOpenSidenav } from "../context";

const Modal = ({ children, closeAction, title, maxWidth = false }) => {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  return (
    <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
      <div
        className={
          "relative max-h-[85vh]  overflow-hidden rounded-md shadow " +
          (maxWidth ? "w-11/12" : "w-11/12 lg:w-1/2 2xl:w-2/6")
        }
      >
        <div
          className={
            "bg-" +
            (sidenavColor ? sidenavColor : "black") +
            "-500 flex w-full items-center justify-between rounded-t-md p-2 px-4 text-white"
          }
        >
          <h2 className="text-palette-white text-center text-xl font-bold">
            {title}
          </h2>
          <button
            type="button"
            className=" hover:bg-palette-ext flex items-center rounded-md p-2 transition-all duration-300 hover:text-white"
            onClick={closeAction}
          >
            <MdClose />
          </button>
        </div>
        <div className={maxWidth ? "max-h-[85vh] overflow-y-scroll" : ""}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
