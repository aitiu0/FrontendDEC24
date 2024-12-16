import React from "react";
import Logo from "../assets/AitiuLogo.png";
import PropTypes from "prop-types";
const Footer = () => {
  const year = new Date().getFullYear();
  return window.location.pathname.split("/")[1] === "dashboard" ? (
    <></>
  ) : (
    <footer className="bg-slate-50 shadow-grey-300 z-10 snap-end  shadow-[0_-1px_-2px_0_#d1d5db] shadow-gray-300">
      <div className="mx-auto flex h-[96px] w-full max-w-screen-lg items-center justify-between p-2">
        <img src={Logo} alt="" className="w-20" />
        <span className="text-sm font-medium">© {year}, Aitiu</span>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  brandName: "Aitiu",
  brandLink: "https://aitiu.com.com/",
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
