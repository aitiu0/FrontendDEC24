import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MdEmail, MdHelp, MdHome, MdMenu } from "react-icons/md";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "../context";
const Header = () => {
  const [mobileMenuView, setMobileMenuView] = useState(false);

  //
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return window.location.pathname.split("/")[1] === "dashboard" ? (
    <>
    </>
  ) : (
    <header className="shadow-grey-300 text-palette-second sticky top-0 left-0 z-30 grid h-20 w-full items-center bg-white p-4 shadow-sm">
      <div className=" relative mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <Link replace={true} to={"/"}>
          <img src={Logo} alt="" className="h-5 w-32 object-cover" />
        </Link>

        <nav
          className={`bg-slate-50 fixed h-max w-full px-2 shadow-sm transition-all duration-200 md:static md:flex-row md:justify-center md:gap-2 md:bg-transparent md:px-0 md:shadow-none ${
            mobileMenuView ? "top-[calc(5rem-1px)]" : "-top-full"
          } justify left-0 flex flex-col items-center`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex w-full items-center justify-between border-b-2 p-2 font-semibold md:w-max ${
                isActive
                  ? "text-palette-primary border-palette-primary"
                  : "text-palette-second md:border-transparent"
              } hover:border-palette-ext`
            }
            onClick={() => setMobileMenuView(false)}
          >
            <span>Inicio</span>
            <MdHome className="text-palette-primary md:hidden" />
          </NavLink>
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              `flex w-full items-center justify-between border-b-2 p-2 font-semibold md:w-max ${
                isActive
                  ? "text-palette-primary border-palette-primary"
                  : "text-palette-second md:border-transparent"
              } hover:border-palette-ext`
            }
            onClick={() => setMobileMenuView(false)}
          >
            <span>Nosotros</span>
            <MdHelp className="text-palette-primary md:hidden" />
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `flex w-full items-center justify-between border-b-2 border-transparent p-2 font-semibold md:w-max ${
                isActive
                  ? "text-palette-primary md:border-palette-primary"
                  : "text-palette-second"
              } hover:border-palette-ext`
            }
            onClick={() => setMobileMenuView(false)}
          >
            <span>Contacto</span>
            <MdEmail className="text-palette-primary md:hidden" />
          </NavLink>
        </nav>
        <div className="flex gap-2 text-2xl">
          <button
            className="hover:text-palette-primary active:text-palette-ext flex items-center justify-center text-2xl md:hidden"
            type="button"
            onClick={() => setMobileMenuView(!mobileMenuView)}
          >
            <MdMenu />
          </button>
          <Link
            to="/login"
            className="flex w-20 justify-center rounded-full border border-transparent bg-[#E35F21] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#FAAB05] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
