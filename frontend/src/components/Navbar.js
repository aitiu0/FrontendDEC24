import React from 'react'
import cart from '../../../frontend/src/assets/cart.svg'
import { Popover } from 'antd'
import Cart from './Cart'

const Navbar = () => {
  return (
    <div className='w-full h-16 shadow flex justify-between items-center '>
    <h1 className='ml-10 font-semibold text-slate-700 text-lg'>Mesa de regalos</h1>
      <Popover trigger={'hover'} placement='bottom' content={
        <div className='w-[400px] max-h-[300px] overflow-y-auto'>
            <Cart/>
        </div>
      } >
      <img className='w-8 mr-10' src={cart} alt="" />
      </Popover>
    </div>
  )
}

export default Navbar
