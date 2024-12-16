import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetailsProduct,
  adminUpdateProduct,
} from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";
import ComboBoxSingle from "../../../../components/elements/ComboBoxSingle";
import { XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  InputFile,
  Input,
  CheckBox,
  InputSelect,
  Textarea,
} from "../../../../components/elements/Inputs";
import ComboBox from "../../../../components/elements/ComboBox";
import {
  adminCreateBrand,
  adminListBrands,
} from "../../../../actions/brandActions";
import {
  adminCreateCategory,
  adminListCategories,
} from "../../../../actions/categoryActions";

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
  Switch,
} from "@material-tailwind/react";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import Alert from "../../../../components/alerts/Alert";

import { useMaterialTailwindController } from "../../../../context";
import Loader from "../../../../components/Loader";

export function ProductEdit() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    macros: {
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      calories: 0,
    },
    portion: 100,
    type: "gramos",
    description: "",
    status: "Disponible",
    onSale: true,
  });
  const { id } = useParams();
  const [selectedImages, setSelectedImages] = useState();
  const [newBrand, setNewBrand] = useState({
    name: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [newGenericName, setNewGenericName] = useState({
    name: "",
  });
  const [showSuccessBrand, setShowSuccessBrand] = useState(false);
  const [showSuccessCategory, setShowSuccessCategory] = useState(false);
  const [showSuccessGenericName, setShowSuccessGenericName] = useState(false);
  const desarollosImage = useRef();
  const productInputImage = useRef();
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminProductUpdate = useSelector((state) => state.adminProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    message: messageUpdate,
  } = adminProductUpdate;

  const adminProductDetails = useSelector((state) => state.adminProductDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    productDetails,
  } = adminProductDetails;
  const adminBrandCreate = useSelector((state) => state.adminBrandCreate);
  const {
    loading: loadingCreateBrand,
    error: errorCreateBrand,
    message: messageBrand,
  } = adminBrandCreate;
  const adminBrandList = useSelector((state) => state.adminBrandList);
  const {
    loading: loadingBrandList,
    error: errorBrandList,
    brands,
  } = adminBrandList;
  const adminCategoryCreate = useSelector((state) => state.adminCategoryCreate);
  const {
    loading: loadingCreateCategory,
    error: errorCreateCategory,
    message: messageCategory,
  } = adminCategoryCreate;
  const adminCategoryList = useSelector((state) => state.adminCategoryList);
  const {
    loading: loadingCategoryList,
    error: errorCategoryList,
    categories,
  } = adminCategoryList;
  const adminGenericNameCreate = useSelector(
    (state) => state.adminGenericNameCreate
  );
  const {
    loading: loadingCreateGenericName,
    error: errorCreateGenericName,
    message: messageGenericName,
  } = adminGenericNameCreate;
  const adminGenericNameList = useSelector(
    (state) => state.adminGenericNameList
  );


  const submitBrandHandler = () => {
    dispatch(adminCreateBrand(newBrand));
  };
  const handleBrandChange = (e) => {
    setNewBrand((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleComboboxChange = (name, value) => {
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const submitCategoryHandler = () => {
    dispatch(adminCreateCategory(newCategory));
  };
  const handleCategoryChange = (e) => {
    setNewCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  const handleChange = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  const handleChangeCheckbox = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked,
            }
          : e.target.checked,
    }));

  const submitHandler = () => {
    setShowErrorMessage(false);
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));

    if (selectedImages) {
      formData.append("files", selectedImages, "image");
    }
    if (id) dispatch(adminUpdateProduct(id, formData));
  };
  const redirect = "/login";
  useEffect(() => {
    if (messageUpdate) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (errorUpdate) {
      setShowErrorMessage(true);
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    } else if (id && (!productDetails || productDetails._id !== id)) {
      dispatch(adminDetailsProduct(id));
      dispatch(adminListBrands());
      dispatch(adminListCategories());
      
    }
    if (productDetails) {
      setProduct(productDetails);
    }

    if (messageBrand) {
      setNewBrand("");
      setShowSuccessBrand(true);
      setTimeout(() => {
        setShowSuccessBrand(false);
      }, 3000);
    }
    if (messageCategory) {
      setNewCategory("");
      setShowSuccessCategory(true);
      setTimeout(() => {
        setShowSuccessCategory(false);
      }, 3000);
    }
    if (messageGenericName) {
      setNewGenericName("");
      setShowSuccessGenericName(true);
      setTimeout(() => {
        setShowSuccessGenericName(false);
      }, 3000);
    }
  }, [
    userInfo,
    messageUpdate,
    productDetails,
    errorUpdate,
    messageBrand,
    messageCategory,
    messageGenericName,
  ]);
  return (
    <div className="bg-slate-50 flex min-h-[85vh] flex-col p-4">
      {showErrorMessage && (
        <div className="fixed bottom-0 left-0 right-0 z-10 flex items-end justify-center p-4">
          <div
            id="toast-danger"
            className="mb-4 flex w-full max-w-xs items-center justify-between rounded-lg bg-red-100 p-4 text-gray-800 shadow dark:bg-gray-800 dark:text-gray-400"
            role="alert"
          >
            <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-red-500 dark:bg-red-800 dark:text-red-200">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 px-3 text-sm font-normal">
              {errorUpdate ? errorUpdate : ""}
            </div>
            <button
              type="button"
              className="ms-auto  -mx-1.5 -my-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-200 p-1.5 text-white hover:bg-gray-100 hover:text-red-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={() => setShowErrorMessage(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-bold">Editar Producto</h2>
      {loadingDetails ? (
        <div className="flex h-[75vh] w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <form
            className="grid  gap-2 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              <Input
                title="Nombre"
                name="name"
                type="text"
                required={true}
                value={product.name}
                setValue={handleChange}
              />
              <ComboBoxSingle
                title="Marca"
                name="brand"
                createOptionModal={"Crear Etapa"}
                selectedItem={product.brand}
                data={brands}
                setAction={handleComboboxChange}
                childrenModal={
                  <form
                    className="flex flex-col gap-3 bg-white p-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitBrandHandler();
                    }}
                  >
                    {showSuccessBrand && <SuccessAlert title="Marca Creada" />}

                    <Input
                      title="Nombre de etapa"
                      name="name"
                      type="text"
                      required={true}
                      value={newBrand.name}
                      setValue={handleBrandChange}
                    />

                    <div className="col-span-full text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          submitBrandHandler();
                        }}
                        className={
                          "bg-" +
                          (sidenavColor ? sidenavColor : "black") +
                          "-500 w-full rounded-md p-2 px-4 text-lg font-bold text-white hover:bg-opacity-90"
                        }
                      >
                        Crear
                      </button>
                    </div>
                  </form>
                }
              >
                {/* Children */}
                {/* Show selected item */}
                <div className="mt-2 flex items-center justify-between rounded-md bg-white p-3 shadow-md">
                  <span className="flex font-medium">Marca seleccionada:</span>
                  <span className="flex items-center">
                    {brands?.map(
                      (brand) =>
                        brand._id === product.brand && (
                          <span key={brand?._id}>{brand?.name}</span>
                        )
                    )}
                  </span>
                </div>
              </ComboBoxSingle>
              <ComboBoxSingle
                title="Categoria"
                name="category"
                createOptionModal={"Crear Categoria"}
                data={categories}
                selectedItem={product.category}
                setAction={handleComboboxChange}
                childrenModal={
                  <form
                    className="flex flex-col gap-3 bg-white p-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitCategoryHandler();
                    }}
                  >
                    {showSuccessCategory && (
                      <SuccessAlert title="Categoria Creada" />
                    )}
                    <Input
                      title="Nombre de Categoria"
                      name="name"
                      type="text"
                      required={true}
                      value={newCategory.name}
                      setValue={handleCategoryChange}
                    />
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
                          "-500 w-full rounded-md p-2 px-4 text-lg font-bold text-white hover:bg-opacity-90"
                        }
                      >
                        Crear
                      </button>
                    </div>
                  </form>
                }
              >
                <div className="mt-2 flex items-center justify-between rounded-md bg-white p-3 shadow-md">
                  <span className="flex font-medium">
                    Categoria seleccionada:
                  </span>
                  <span className="flex items-center">
                    {categories?.map(
                      (category) =>
                        category._id === product.category && (
                          <option value={category._id} key={category._id}>
                            {category.name}
                          </option>
                        )
                    )}
                  </span>
                </div>
              </ComboBoxSingle>
              

              <Typography className="text-lg font-semibold  hover:text-gray-800">
                Macro Nutrientes
              </Typography>
              <Input
                title="Proteina"
                name="macros.proteins"
                type="number"
                required={true}
                value={product.macros?.proteins}
                setValue={handleChange}
              />
              <Input
                title="Carbohidratos"
                name="macros.carbohydrates"
                type="number"
                required={true}
                value={product.macros?.carbohydrates}
                setValue={handleChange}
              />
              <Input
                title="Grasas"
                name="macros.fats"
                type="number"
                required={true}
                value={product.macros?.fats}
                setValue={handleChange}
              />
              <Input
                title="Calorias"
                name="macros.calories"
                type="number"
                required={true}
                value={product.macros?.calories}
                setValue={handleChange}
              />
              <Input
                title="Porcion"
                name="portion"
                type="number"
                required={true}
                value={product.portion}
                setValue={handleChange}
              />
              <InputSelect
                title="Tipo de Porcion"
                name="type"
                value={product.type}
                setValue={handleChange}
              >
                <option disabled value="">
                  Seleccione una opcion
                </option>
                <option value="gramos">Gramos</option>
                <option value="mililitros">Mililitros</option>
              </InputSelect>

              <Input
                title="Beneficios"
                name="benefits"
                type="text"
                required={true}
                value={product.benefits}
                setValue={handleChange}
              />

              <Input
                title="status"
                name="status"
                type="text"
                required={true}
                value={product.status}
                setValue={handleChange}
              />

              <div className="flex justify-center">
                <Switch
                  key={"onSale"}
                  id={"onSale"}
                  name={"onSale"}
                  label="En venta"
                  defaultChecked={product.onSale}
                  labelProps={{
                    className: "text-sm font-medium text-black",
                  }}
                  onChange={handleChangeCheckbox}
                />
              </div>
            </div>

            <div className="group flex flex-col  gap-2">
              <span className="block font-medium">Imagen del Producto:</span>
              <div className="group relative flex h-max items-center justify-center">
                <img
                  src={product?.images ? product.images[0].url : ""}
                  alt={"currentLogo"}
                  ref={desarollosImage}
                  className="aspect-square mx-auto w-full rounded-md border-2 shadow"
                />
                <input
                  type="file"
                  hidden
                  name="desarollosImage"
                  className="h-full"
                  ref={productInputImage}
                  onChange={(e) => {
                    let url = URL.createObjectURL(e.target.files[0]);
                    productInputImage.current.src = url;
                    setSelectedImages(e.target.files[0]);
                  }}
                />
                <button
                  className="aspect-square absolute top-0 hidden h-full w-full items-center justify-center rounded-md bg-black/20 font-bold text-white drop-shadow group-hover:flex"
                  type="button"
                  onClick={() => productInputImage.current.click()}
                >
                  Subir nueva imagen
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <div className="col-span-full flex justify-center text-center"></div>
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="onSubmit"
                  color={sidenavColor}
                  className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                  fullWidth
                >
                  {loadingUpdate && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                    />
                  )}
                  {loadingUpdate ? "Modificando..." : "Modificar"}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default ProductEdit;
