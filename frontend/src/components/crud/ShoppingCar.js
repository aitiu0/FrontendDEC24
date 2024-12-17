import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../../reducers/cartSlice";

const ShoppingCar = () => {
  const [purchasedProduct, setPurchasedProduct] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleBuyProduct = (product) => {
    const confirmed = true;
    if (confirmed) {
      setPurchasedProduct(product);
      handleRemoveFromCart(product.id);
    }
  };

  const handleReturnToCart = () => {
    setPurchasedProduct(null);
  };

  return (
    <>
      {purchasedProduct ? (
        <div className="p-4 md:p-8">
          <h1 className="mb-4 text-center text-2xl font-bold">
            ¡Compra exitosa!
          </h1>
          <h2 className="text-center text-xl font-semibold">
            Has comprado el producto {purchasedProduct.name}.
          </h2>
          <button
            onClick={handleReturnToCart}
            className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Volver al carrito
          </button>
        </div>
      ) : (
        <div className="p-4 md:p-8">
          <h1 className="mb-4 text-center text-2xl font-bold">
            Carrito de Compras
          </h1>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col items-center justify-between rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg sm:flex-row"
                >
                  <img
                    className="mb-4 h-20 w-20 object-contain sm:mb-0 sm:mr-4"
                    src={item.images[0].url}
                    alt={item.name}
                  />
                  <div className="sm:flex-grow">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="mt-1 text-gray-600">{item.model}</p>
                    <p className="mt-1 text-lg font-bold">
                      Precio: ${item.price}
                    </p>
                    <p className="mt-1">Cantidad: {item.quantityInCart}</p>
                  </div>
                  <div className="mt-4 flex gap-4 sm:mt-0 sm:flex-col sm:items-end">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleBuyProduct(item)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Comprar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default ShoppingCar;
