/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import cart from "../../../../frontend/src/assets/cart2.svg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/invitadoActions";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const response = await dispatch(addToCart(product));

    if (response.success) {
      toast.success("¡Producto agregado con éxito!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start bg-white shadow-md rounded-lg overflow-hidden m-5">
      
      {/* Imagen del Producto */}
      <div className="flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-[200px] w-[200px] object-cover"
          />
        ) : (
          <div className="h-[200px] w-[200px] flex items-center justify-center bg-gray-100 text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Detalles del Producto */}
      <div className="flex flex-col justify-between p-5 w-full">
        <h1 className="text-lg font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-3 w-[700px]">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            <span className="font-medium">Stock:</span> {product.countInStock}
          </p>
        </div>

        {/* Precio y Botón */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-lg font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleSubmit}
            className="bg-brown-500 hover:bg-brown-600 text-white rounded-full p-3 shadow-md focus:outline-none"
          >
            <img src={cart} alt="Add to Cart" className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
