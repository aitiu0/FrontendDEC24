import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getLoginData } from "../../../../actions/userActions";
import { Input, InputFile } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";
import ComboBoxSingle from "../../../../components/elements/ComboBoxSingle";

import { PRODUCT_ADMIN_CREATE_RESET } from "../../../../constants/productConstants";
import { adminCreateBrand, adminListBrands } from "../../../../actions/brandActions";
import { adminCreateCategory, adminListCategories } from "../../../../actions/categoryActions";
import { adminCreateProduct } from "../../../../actions/productActions";

import { Button, Typography, Switch } from "@material-tailwind/react";

export function ProductCreate() {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    model: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
    countInStock: 0,
    taxesIncluded: false,
    onSale: false,
  });

  const [selectedImages, setSelectedImages] = useState();
  const [newBrand, setNewBrand] = useState({ name: "" });
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [showSuccessBrand, setShowSuccessBrand] = useState(false);
  const [showSuccessCategory, setShowSuccessCategory] = useState(false);
  const [showImageAlert, setShowImageAlert] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminProductCreate = useSelector((state) => state.adminProductCreate);
  const { error: errorCreateProduct, message: messageCreateProduct } = adminProductCreate;

  const adminBrandList = useSelector((state) => state.adminBrandList);
  const { brands = [] } = adminBrandList || {};

  const adminCategoryList = useSelector((state) => state.adminCategoryList);
  const { categories = [] } = adminCategoryList || {};

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleComboboxChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBrandChange = (e) => {
    setNewBrand({ name: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory({ name: e.target.value });
  };

  const submitHandler = () => {
    setShowImageAlert(false);
    setShowErrorMessage(false);

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));

    if (selectedImages) {
      formData.append("files", selectedImages, "image");
    } else {
      setShowImageAlert(true);
      return;
    }

    dispatch(adminCreateProduct(formData));
  };

  const submitBrandHandler = () => {
    dispatch(adminCreateBrand(newBrand));
    setNewBrand({ name: "" });
    setShowSuccessBrand(true);
  };

  const submitCategoryHandler = () => {
    dispatch(adminCreateCategory(newCategory));
    setNewCategory({ name: "" });
    setShowSuccessCategory(true);
  };

  useEffect(() => {
    if (messageCreateProduct) {
      dispatch({ type: PRODUCT_ADMIN_CREATE_RESET });
      navigate("/admin/productos");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else {
      dispatch(adminListBrands());
      dispatch(adminListCategories());
    }
  }, [dispatch, userInfo, messageCreateProduct, navigate]);

  return (
    <div className="bg-slate-50 p-4">
    {showErrorMessage && <Alert title="Error" text="No se pudo crear el producto." />}
    <h2 className="text-palette-primary text-xl font-bold">Agregar Producto</h2>
    <form
      className="grid gap-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <div className="flex flex-col gap-3">
        <Input title="Nombre" name="name" value={product.name} setValue={handleChange} required />
  
        <ComboBoxSingle
          title="Marca"
          name="brand"
          createOptionModal={"Crear Marca"}
          data={brands}
          selectedItem={product.brand}
          setAction={handleComboboxChange}
        />
  
        <Input title="Modelo" name="model" value={product.model} setValue={handleChange} required />
  
        <ComboBoxSingle
          title="Categoría"
          name="category"
          createOptionModal={"Crear Categoría"}
          data={categories}
          selectedItem={product.category}
          setAction={handleComboboxChange}
        />
  
        <Input title="Descripción" name="description" value={product.description} setValue={handleChange} required />
        <Input title="Precio" name="price" type="number" value={product.price} setValue={handleChange} required />
        <Input title="Descuento" name="discount" type="number" value={product.discount} setValue={handleChange} />
        <Input title="Cantidad en Inventario" name="countInStock" type="number" value={product.countInStock} setValue={handleChange} />
  
        <Switch
          id="taxesIncluded"
          name="taxesIncluded"
          label="Impuestos Incluidos"
          checked={product.taxesIncluded}
          onChange={handleCheckboxChange}
        />
  
        <Switch
          id="onSale"
          name="onSale"
          label="En Venta"
          checked={product.onSale}
          onChange={handleCheckboxChange}
        />
      </div>
  
      <div className="flex flex-col gap-4">
        <InputFile name="product_image" title="Imagen del Producto" setValue={setSelectedImages} />
        {selectedImages && (
          <div className="mt-2 flex justify-center">
            <img
              src={URL.createObjectURL(selectedImages)}
              alt="Vista previa"
              className="max-h-40 w-auto rounded-md shadow-md"
            />
          </div>
        )}
      </div>
  
      {/* Contenedor Sticky para el Botón */}
      <div className="col-span-full sticky bottom-0 bg-slate-50 p-4 shadow-md">
        <Button
          type="submit"
          fullWidth
          className="rounded-md p-2 px-4 text-lg font-normal text-white hover:bg-opacity-90"
        >
          Crear Producto
        </Button>
      </div>
    </form>
  </div>
  
  );
}

export default ProductCreate;
