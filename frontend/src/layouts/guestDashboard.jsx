import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import DashboardNavbar from "../components/dashboard/dashboard-navbar";
import Sidenav from "../components/dashboard/Sidenav";
import Footer from "../components/dashboard/footerDash";
import Configurator from "../components/dashboard/configurator";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import Logo from "../assets/logo.png";
import { getLoginData } from "../actions/userActions";

export function GuestDashboard() {
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = "/login";
  useEffect(() => {
    if (!userInfo && !error) {
      dispatch(getLoginData());
    } else if (error === "User not login") {
      navigate(redirect);
    } /*else if (userInfo?.userType !== "Admin") {
      navigate(redirect);
    }*/
  }, [error, userInfo]);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={sidenavType === "dark" ? Logo : Logo}
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(setController, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes?.map(
            ({ layout, pages }) =>
              layout === "guest" &&
              pages.map(({ path, element, subpages, isList }) => (
                <>
                  <Route exact path={path} element={element} />
                  {isList && (
                    <>
                      <Route
                        exact
                        path={path + "/search/:keyword"}
                        element={element}
                      />
                      <Route
                        exact
                        path={path + "/page/:pageNumber"}
                        element={element}
                      />
                      <Route
                        exact
                        path={path + "/search/:keyword/page/:pageNumber"}
                        element={element}
                      />
                      <Route
                        exact
                        path={path + "/sort/:sort/order/:order"}
                        element={element}
                      />
                      <Route
                        exact
                        path={
                          path + "/sort/:sort/order/:order/page/:pageNumber"
                        }
                        element={element}
                      />
                      <Route
                        exact
                        path={
                          path +
                          "/search/:keyword/sort/:sort/order/:order/page/:pageNumber"
                        }
                        element={element}
                      />
                      <Route
                        exact
                        path={path + "/search/:keyword/sort/:sort/order/:order"}
                        element={element}
                      />
                    </>
                  )}
                  {subpages?.map(({ path: subpath, element: subelement }) => (
                    <Route exact path={path + subpath} element={subelement} />
                  ))}
                </>
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

GuestDashboard.displayName = "/src/layout/guestDashboard.jsx";

export default GuestDashboard;
