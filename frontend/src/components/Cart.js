/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import trash from "../../../frontend/src/assets/trash.svg";
import { removeToCart } from "../actions/invitadoActions";

const Cart = () => {
  const cart = useSelector((state) => state.invitaciones.cart);
  const dispatch = useDispatch();

  const handleDelete = (product) => {
    console.log("Producto a eliminar:", product);
    dispatch(removeToCart(product._id));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-5 shadow-lg rounded-lg">
      {/* Título del carrito */}
      <div className="border-b border-gray-300 pb-3 mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
      </div>

      {/* Carrito vacío */}
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-gray-600">
            No hay productos en el carrito...
          </p>
        </div>
      ) : (
        <>
          {/* Lista de productos */}
          <div className="space-y-5">
            {cart.map((product) => (
              <div
                className="flex items-center border-b border-gray-200 pb-3"
                key={product.id}
              >
                {/* Imagen del producto */}
                <div className="flex-shrink-0">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="h-[100px] w-[100px] object-cover rounded-md"
                    />
                  ) : (
                    <div className="h-[100px] w-[100px] bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Detalles del producto */}
                <div className="ml-5 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-800">
                      {product.name}
                    </h2>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img
                        src={trash}
                        alt="Eliminar"
                        className="w-5 h-5"
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Stock: {product.countInStock}
                  </p>
                  <p className="text-lg font-semibold text-green-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón de compra */}
          <div className="mt-8 flex justify-center">
            <a
              href="/quiz"
              className="bg-brown-500 hover:bg-brown-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md"
            >
              Purchase
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
