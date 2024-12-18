import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDetailsProduct,
  adminUpdateProduct,
} from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";
import ComboBoxSingle from "../../../../components/elements/ComboBoxSingle";
import {
  InputFile,
  Input,
  InputSelect,
  Textarea,
} from "../../../../components/elements/Inputs";
import {
  adminCreateBrand,
  adminListBrands,
} from "../../../../actions/brandActions";
import {
  adminCreateCategory,
  adminListCategories,
} from "../../../../actions/categoryActions";
import { Button, Switch, Typography } from "@material-tailwind/react";
import Loader from "../../../../components/Loader";
import SuccessAlert from "../../../../components/alerts/SuccessAlert";

export function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
    countInStock: 0,
    onSale: false,
  });

  const [selectedImages, setSelectedImages] = useState(null);
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showSuccessBrand, setShowSuccessBrand] = useState(false);
  const [showSuccessCategory, setShowSuccessCategory] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminProductDetails = useSelector((state) => state.adminProductDetails);
  const { loading: loadingDetails, productDetails } = adminProductDetails;

  const adminProductUpdate = useSelector((state) => state.adminProductUpdate);
  const { loading: loadingUpdate, error: errorUpdate, message: messageUpdate } =
    adminProductUpdate;

  const adminBrandList = useSelector((state) => state.adminBrandList);
  const { brands = [] } = adminBrandList;

  const adminCategoryList = useSelector((state) => state.adminCategoryList);
  const { categories = [] } = adminCategoryList;

  useEffect(() => {
    if (messageUpdate) {
      navigate("/admin/productos");
    } else if (!userInfo) {
      dispatch(getLoginData());
    } else if (id && (!productDetails || productDetails._id !== id)) {
      dispatch(adminDetailsProduct(id));
      dispatch(adminListBrands());
      dispatch(adminListCategories());
    }
    if (productDetails) {
      setProduct(productDetails);
    }
  }, [dispatch, id, userInfo, productDetails, messageUpdate, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prev) => ({ ...prev, [name]: checked }));
  };

  const handleBrandChange = (e) => setNewBrand(e.target.value);
  const handleCategoryChange = (e) => setNewCategory(e.target.value);

  const submitHandler = () => {
    setShowErrorMessage(false);

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    if (selectedImages) {
      formData.append("files", selectedImages, "image");
    }
    dispatch(adminUpdateProduct(id, formData));
  };

  const submitBrandHandler = () => {
    dispatch(adminCreateBrand({ name: newBrand }));
    setNewBrand("");
    setShowSuccessBrand(true);
    setTimeout(() => setShowSuccessBrand(false), 3000);
  };

  const submitCategoryHandler = () => {
    dispatch(adminCreateCategory({ name: newCategory }));
    setNewCategory("");
    setShowSuccessCategory(true);
    setTimeout(() => setShowSuccessCategory(false), 3000);
  };

  return (
    <div className="bg-slate-50 flex min-h-screen flex-col p-4">
      {loadingDetails ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-xl font-bold">Editar Producto</h2>
          {showErrorMessage && (
            <div className="text-red-500">Error al actualizar el producto.</div>
          )}
          <form
            className="grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              <Input
                title="Nombre"
                name="name"
                value={product.name}
                setValue={handleChange}
                required
              />
              <ComboBoxSingle
                title="Marca"
                name="brand"
                createOptionModal={"Crear Marca"}
                data={brands}
                selectedItem={product.brand}
                setAction={(name, value) =>
                  setProduct((prev) => ({ ...prev, [name]: value }))
                }
                childrenModal={
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitBrandHandler();
                    }}
                    className="flex flex-col gap-3"
                  >
                    {showSuccessBrand && <SuccessAlert title="Marca Creada" />}
                    <Input
                      title="Nombre de Marca"
                      name="brandName"
                      value={newBrand}
                      setValue={handleBrandChange}
                      required
                    />
                    <Button type="submit">Crear</Button>
                  </form>
                }
              />
              <ComboBoxSingle
                title="Categoría"
                name="category"
                createOptionModal={"Crear Categoría"}
                data={categories}
                selectedItem={product.category}
                setAction={(name, value) =>
                  setProduct((prev) => ({ ...prev, [name]: value }))
                }
                childrenModal={
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitCategoryHandler();
                    }}
                    className="flex flex-col gap-3"
                  >
                    {showSuccessCategory && (
                      <SuccessAlert title="Categoría Creada" />
                    )}
                    <Input
                      title="Nombre de Categoría"
                      name="categoryName"
                      value={newCategory}
                      setValue={handleCategoryChange}
                      required
                    />
                    <Button type="submit">Crear</Button>
                  </form>
                }
              />
              <Textarea
                title="Descripción"
                name="description"
                value={product.description}
                setValue={handleChange}
                required
              />
              <Input
                title="Precio"
                name="price"
                type="number"
                value={product.price}
                setValue={handleChange}
                required
              />
              <Input
                title="Descuento"
                name="discount"
                type="number"
                value={product.discount}
                setValue={handleChange}
              />
              <Input
                title="Cantidad en Inventario"
                name="countInStock"
                type="number"
                value={product.countInStock}
                setValue={handleChange}
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
              <InputFile
                name="productImage"
                title="Imagen del Producto"
                setValue={setSelectedImages}
              />
              {selectedImages && (
                <img
                  src={URL.createObjectURL(selectedImages)}
                  alt="Vista previa"
                  className="max-h-40 rounded-md shadow-md"
                />
              )}
            </div>

            <Button type="submit" className="col-span-full">
              Guardar Cambios
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export default ProductEdit;
