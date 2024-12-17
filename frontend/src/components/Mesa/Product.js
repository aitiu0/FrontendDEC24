/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import cart from '../../../../frontend/src/assets/cart2.svg';
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/invitadoActions";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-lg rounded-lg overflow-hidden m-5">
      {/* Product Image Section */}
      <div className="flex-shrink-0">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="h-[200px] w-[200px] object-cover"
          />
        ) : (
          <div className="h-[200px] w-[200px] flex items-center justify-center bg-gray-200 text-gray-600">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col justify-between p-5 w-full md:w-[70%]">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2 w-[600px] text-sm">{product.description}</p>
        </div>
        <div className="mt-5 flex items-center justify-between relative">
          <p className="text-gray-500 text-sm">Stock: {product.countInStock}</p>
          <p className="text-xl font-semibold text-green-600 absolute right-0">${product.price}</p>
        </div>
      </div>

      {/* Add to Cart Section */}
      <div className="flex flex-col items-center justify-between p-5">
        <button
          onClick={handleSubmit}
          className="bg-brown-500 hover:bg-brown-600 text-white rounded-full p-3 shadow-md transition-transform transform hover:scale-105"
        >
          <img src={cart} alt="Add to Cart" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Product;
