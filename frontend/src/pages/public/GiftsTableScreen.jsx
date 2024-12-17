import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { updateGiftsDetails } from '../../redux/giftsSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import GiftItem from '../../components/gifts/GiftItem.jsx'
import axios from 'axios'
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom'

const GiftsTableScreen = () => {
	const dispatch = useAppDispatch()
	const gifts = useSelector((state: any) => state.gifts.gifts);
	const shoppingCart = useAppSelector((state) => state.gifts.shoppingCart);
	const [cartModal, setCartModal] = useState(false);
	const [thankYouModal, setThankYouModal] = useState(false);
	const navigate = useNavigate();
	const { idInvitado } = useParams();

	const fetchData = () => {
		axios.get('http://localhost:5001/api/products').then(response => {
		      console.log('Datos obtenidos correctamente');
		      dispatch(updateGiftsDetails(response.data.products));
		    }).catch(error => {
		      console.error('Error al enviar los datos', error)
		    })
	}

	const handleCheckout = () => {
		setCartModal(false); // Cierra el modal del carrito
	    setThankYouModal(true); // Muestra el modal de "Gracias por los regalos"
	    setTimeout(() => {
	      navigate(`/quiz/${idInvitado}`); // Navega a /quiz/ después de 10 segundos
	    }, 10000);
	}

	useEffect(() => {
		fetchData();
	}, [])

	return (
		<div className="container mx-auto px-4 py-8">
	      <motion.h1
	        className="text-4xl font-bold text-center mb-8"
	        initial={{ y: -50, opacity: 0 }}
	        animate={{ y: 0, opacity: 1 }}
	        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
	      >
	        Mesa de Regalos
	      </motion.h1>
	      <button
	          className="relative text-2xl bg-gray-200 p-2 rounded-full hover:bg-gray-300"
	          onClick={() => setCartModal(true)}
	        >
	          <FiShoppingCart />
	          {shoppingCart.length > 0 && (
	            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
	              {shoppingCart.reduce((sum, item) => sum + item.quantity, 0)}
	            </span>
	          )}
	        </button>
	      <motion.div
	        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
	        initial={{ opacity: 0 }}
	        animate={{ opacity: 1 }}
	        transition={{ staggerChildren: 0.1 }}
	      >
	        {gifts.map((gift) => (
	       	
	        	<GiftItem key={gift._id} {...gift} />
	        
	        ))}
	      </motion.div>
	      {cartModal && (
	        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
	          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
	            <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
	            {shoppingCart.length > 0 ? (
	              <ul>
	                {shoppingCart.map((item) => (
	                  <li key={item._id} className="flex justify-between mb-2">
	                    <span>
	                      {item.name} x {item.quantity}
	                    </span>
	                    <span className="font-bold">
	                      {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
	                    </span>
	                  </li>
	                ))}
	              </ul>
	            ) : (
	              <p>El carrito está vacío.</p>
	            )}
	            <div className="flex justify-end gap-2 mt-4">
	              <button
	                className="bg-red-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-red-600 transition ease-in-out duration-500"
	                onClick={() => setCartModal(false)}
	              >
	                Cerrar
	              </button>
	              <button className="bg-blue-500 text-white px-6 py-2 rounded-md ml-4 shadow-md shadow-black hover:bg-blue-600 transition ease-in-out duration-500" onClick={handleCheckout}>
	                Checkout
	              </button>
	            </div>
	          </div>
	        </div>
	      )}
	      {thankYouModal && (
	        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
	          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
	            <h2 className="text-xl font-semibold mb-4">¡Gracias por los regalos!</h2>
	            <p className="text-gray-700">
	              Redirigiéndote a la siguiente sección en 10 segundos...
	            </p>
	          </div>
	        </div>
	      )}
	    </div>
	)
}

export default GiftsTableScreen