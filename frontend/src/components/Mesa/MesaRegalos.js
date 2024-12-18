import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, orderProducts } from '../../actions/invitadoActions'
import Product from './Product'
import Navbar from '../Navbar'

const MesaRegalos = () => {

  const products = useSelector(state => state.invitaciones.products)

  const handleOrderChange = (e) => {
    const order = e.target.value;
    dispatch(orderProducts(order))
  }

  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])

  return (
    <div className='w-full min-h-screen'>
    <Navbar/>
    
    <div className='mt-5 flex justify-center'>
      <select onChange={handleOrderChange}>
        <option value="">Order by Price</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendiente</option>
      </select>
    </div>

      <div className=' mt-5'>
      {products.map(product => (
        <Product product={product} key={product.id} />
      ))}
      </div>
    </div>
  )
}

export default MesaRegalos
