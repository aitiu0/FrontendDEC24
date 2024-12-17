/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useSelector } from 'react-redux'


const Cart = () => {
    const cart = useSelector(state => state.invitaciones.cart)
    
  return (
    <div>
    <div className='border-b border-gray-400 pb-2 mb-3'>
        <h1 className='text-lg'>Shopping Cart</h1>
    </div>
      {cart.map(product => (
        <div className='flex' key={product.id}>
            <div>
            {product.images && product.images.length > 0 ? (
          product?.images?.map((image, index) => (
            <img
              src={image.url}
              key={index}
              alt={`Product Image ${index + 1}`}
              className="h-auto w-[100px] rounded object-cover"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
            </div>

            <div className='ml-5'>
                <h1 className='text-lg font-semibold'>{product.name}</h1>
                <p>${product.price}</p>
            </div>

        </div>
      ))}

      <div className='mt-5 flex justify-center'>
        <a href='/quiz'  className='bg-brown-400 text-white p-1 rounded w-[100px] text-center font-semibold'>Purchase</a>
      </div>
    </div>
  )
}

export default Cart
