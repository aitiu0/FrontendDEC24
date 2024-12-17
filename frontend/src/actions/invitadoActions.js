import axios from "axios";

const URL = 'http://localhost:5001'


export const getInvitado = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${URL}/api/users/${id}`)
        dispatch({ type: "GET_USER", payload: response.data })
    } catch (error) {
        console.error(error.message);
        
    }
}

export const RequestInvitation = (id, respuesta) => async (dispatch) => {
    try {
        const response = await axios.post(`${URL}/api/invite-response/${id}`, respuesta)
        dispatch({ type: "REQUEST_INV", payload: response.data })
    } catch (error) {
        console.error(error.message);
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        const response = await axios.get(`${URL}/api/products`)
        dispatch({ type: "GET_PRODUCTS", payload: response.data })
    } catch (error) {
        console.error(error.message);
    }
}

export const addToCart = (productData) => async (dispatch) => {
    dispatch({ type: "ADD_TO_CART", payload: productData })
    const responseCart = await axios.get(`${URL}/api/products`)
        dispatch({ type: "GET_PRODUCTS", payload: responseCart.data })
}

export const orderProducts = (order) => (dispatch, getState) => {
    const { products_copy, products } = getState()

    let orderProduct = [...products_copy]  

    if (order === 'asc') {
        orderProduct.sort((a, b) => a.price - b.price)
    } else if (order === 'desc') { 
        orderProduct.sort((a, b) => b.price - a.price)
    } else {
        orderProduct = [...products]
    }


     dispatch({ type: 'ORDER_PRODUCTS', payload: orderProduct })
}
