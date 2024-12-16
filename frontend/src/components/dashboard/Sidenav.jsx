import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../actions/userActions";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../../context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [open, setOpen] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatchF = useDispatch();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    if (!userInfo) {
      dispatchF(getLoginData());
    }
  }, [userInfo]);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon
            strokeWidth={2.5}
            className="mr-3 mt-3 h-5 w-5 text-white"
          />
        </IconButton>
      </div>
      <div className="no-scrollbar m-4 h-[calc(100vh-116px)] overflow-scroll">
        {routes.map(
          ({ layout, title, pages, userType }, key) =>
            userInfo?.userType === userType && (
              <ul key={key} className="mb-4 flex flex-col gap-1">
                {title && (
                  <li className="mx-3.5 mt-4 mb-2">
                    <Typography
                      variant="small"
                      color={sidenavType === "dark" ? "white" : "blue-gray"}
                      className="font-black uppercase opacity-75"
                    >
                      {title}
                    </Typography>
                  </li>
                )}
                {pages.map(
                  ({ icon, name, path, subpages, hiddenSub }, index) => (
                    <li key={name}>
                      {subpages && subpages.length > 0 && !hiddenSub ? (
                        <NavLink to={`/${layout}${path}`}>
                          {({ isActive }) => (
                            <Button
                              variant={isActive ? "gradient" : "text"}
                              color={
                                isActive
                                  ? sidenavColor
                                  : sidenavType === "dark"
                                  ? "white"
                                  : "blue-gray"
                              }
                              className="flex items-center p-0 capitalize"
                              fullWidth
                            >
                              <Accordion
                                open={open === index}
                                icon={
                                  <ChevronDownIcon
                                    strokeWidth={2.5}
                                    className={`mx-auto h-4 w-4 transition-transform ${
                                      open === index ? "rotate-180" : ""
                                    }`}
                                  />
                                }
                              >
                                <ListItem className="p-0">
                                  <AccordionHeader
                                    onClick={() => handleOpen(index)}
                                    className={
                                      "border-b-0 px-4 " +
                                      (isActive
                                        ? "text-white"
                                        : sidenavType === "dark"
                                        ? "text-white"
                                        : "text-blue-gray-500")
                                    }
                                  >
                                    <ListItemPrefix>{icon}</ListItemPrefix>
                                    <Typography className="mr-auto font-medium capitalize">
                                      {name}
                                    </Typography>
                                  </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                  <List
                                    className={
                                      "p-0 " +
                                      (isActive
                                        ? "text-white"
                                        : sidenavType === "dark"
                                        ? "text-white"
                                        : "text-blue-gray-500")
                                    }
                                  >
                                    {subpages.map(
                                      (
                                        {
                                          icon: subicon,
                                          name: subname,
                                          path: subpath,
                                          hide,
                                        },
                                        index
                                      ) =>
                                        !hide && (
                                          <NestedLink
                                            key={index} // Ensure each link has a unique key
                                            layout={layout}
                                            parentPath={path}
                                            subpath={subpath}
                                            subname={subname}
                                            icon={subicon}
                                          />
                                        )
                                    )}
                                  </List>
                                </AccordionBody>
                              </Accordion>
                            </Button>
                          )}
                        </NavLink>
                      ) : (
                        <NavLink
                          to={`/${layout}${path}`}
                          onClick={() => handleOpen(index)}
                        >
                          {({ isActive }) => (
                            <Button
                              variant={isActive ? "gradient" : "text"}
                              color={
                                isActive
                                  ? sidenavColor
                                  : sidenavType === "dark"
                                  ? "white"
                                  : "blue-gray"
                              }
                              className="flex items-center gap-4 px-4 capitalize"
                              fullWidth
                            >
                              {icon}
                              <Typography
                                color="inherit"
                                className="font-medium capitalize"
                              >
                                {name}
                              </Typography>
                            </Button>
                          )}
                        </NavLink>
                      )}
                    </li>
                  )
                )}
              </ul>
            )
        )}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "../../assets/AitiuLogoBlanco.png",
  brandName: "AiTiU",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
const NestedLink = ({ layout, parentPath, subpath, subname, icon }) => {
  return (
    <NavLink to={`/${layout}${parentPath}${subpath}`}>
      <ListItem className="ml-6">
        <ListItemPrefix>{icon}</ListItemPrefix>
        {subname}
      </ListItem>
    </NavLink>
  );
};
export default Sidenav;
