import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../../../../actions/userActions";
import { adminCreateCategory } from "../../../../actions/categoryActions";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import { Input } from "../../../../components/elements/Inputs";
import { useMaterialTailwindController } from "../../../../context";
import { CATEGORY_ADMIN_CREATE_RESET } from "../../../../constants/categoryConstants";
import { Switch } from "@material-tailwind/react";

export function CategoryCreate({ closeAction }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const adminCategoryCreate = useSelector((state) => state.adminCategoryCreate);
  const {
    loading: loadingCreateCategory,
    error: errorCreateCategory,
    message: messageCategory,
  } = adminCategoryCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const [newCategory, setNewCategory] = useState({ name: "" });
  const [showSuccessCategory, setShowSuccessCategory] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  const submitCategoryHandler = () => {
    dispatch(adminCreateCategory(newCategory));
  };
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };
  const handleChange = (e) =>
    setNewCategory((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  useEffect(() => {
    if (messageCategory) {
      setShowSuccessCategory(true);
      setTimeout(() => {
        dispatch({ type: CATEGORY_ADMIN_CREATE_RESET });
        if (!keepCreating) {
          navigate("/admin/categorias");
        }
        setNewCategory("");
        setShowSuccessCategory(false);
      }, 1000);
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate("/login");
    }
  }, [userInfo, messageCategory]);
  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
            <h2 className="text-2xl  text-white">Crear Categoria</h2>
            <button
              type="button"
              onClick={closeAction}
              className="text-2xl font-bold hover:text-red-600"
            >
              <MdClose />
            </button>
          </div>
          <form
            className="flex flex-col gap-3 bg-white p-4"
            onSubmit={(e) => {
              e.preventDefault();
              submitCategoryHandler();
            }}
          >
            {showSuccessCategory && <SuccessAlert title="Categoria creada" />}

            <Input
              title="Nombre de categoria"
              name="name"
              type="text"
              required={true}
              value={newCategory.name}
              setValue={handleChange}
            />
            <div className="flex justify-center">
              <Switch
                key={"keepCreating"}
                id={"keepCreating"}
                label="Seguir creando"
                defaultChecked={false}
                labelProps={{
                  className: "text-sm font-medium text-black",
                }}
                onChange={(e) => setKeepCreating(e.target.checked)}
              />
            </div>
            <div className="col-span-full text-center">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  submitCategoryHandler();
                }}
                className={
                  "bg-" +
                  (sidenavColor ? sidenavColor : "black") +
                  "-500 flex w-full justify-center rounded-md p-2 px-4 text-center text-lg  text-white hover:bg-opacity-90"
                }
              >
                {loadingCreateCategory && (
                  <img
                    src="/assets/loader.svg"
                    className="my-auto mr-3 h-6 w-6"
                  />
                )}
                {loadingCreateCategory ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CategoryCreate;
