import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../reducers/cartSlice";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const URL = "/api/products";
        const { data } = await axios.get(URL);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los productos");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="p-4 md:p-8">
      <Link
        to="/cart" 
        className="mt-4 block w-full rounded bg-green-500 py-2 text-center text-white hover:bg-green-600"
      >
        Ir al carrito
      </Link>
      <h1 className="mb-4 text-center text-2xl font-bold">Productos</h1>
      {error && <p className="mb-4 text-center text-red-500">{error}</p>}
      <ul className="space-y-4">
        {products.length !== 0 ? (
          products.products.map((product, i) => (
            <li
              key={i}
              className="rounded-lg border p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <img
                className="h-48 w-full object-contain"
                src={product.images[0].url}
                alt="Product"
              />

              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.model}</p>
              <p className="mt-2 text-lg font-bold">Precio: ${product.price}</p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
              >
                Comprar ahora
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">Cargando productos...</p>
        )}
      </ul>
    </div>
  );
};

export default Products;
