import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleReserve, addToCart } from "../../redux/giftsSlice";
import React, { useState } from "react";

const GiftItem = ({ id, name, images, reserved }) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        dispatch(addToCart({ id, quantity }));
        setShowModal(false); // Cierra el modal
        setQuantity(1); // Reinicia la cantidad
    };

    return (
        <div>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bg-white p-4 rounded-lg shadow-md cursor-pointer ${
                    reserved ? "opacity-50" : ""
                }`}
                onClick={() => setShowModal(true)}
            >
                <motion.img
                    src={images[0].url}
                    alt={name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <motion.h3
                    className="text-lg font-semibold text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {name}
                </motion.h3>
                <motion.p
                    className="text-sm text-center text-gray-500 mt-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {reserved ? "Reservado" : "Disponible"}
                </motion.p>
            </motion.div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">
                            Agregar "{name}" al carrito
                        </h2>
                        <label className="block mb-4">
                            Cantidad:
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            parseInt(e.target.value) || 1
                                        )
                                    )
                                }
                                min="1"
                                className="border p-2 w-full mt-2"
                            />
                        </label>
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-red-600 transition ease-in-out duration-500"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-blue-600 transition ease-in-out duration-500"
                                onClick={handleAddToCart}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftItem;
