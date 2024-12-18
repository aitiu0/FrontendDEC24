const initialState = {
    invitado: {},
    products: [],
    products_copy: [],
    cart: JSON.parse(localStorage.getItem("CART")) || []
}

const invitacionesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_USER":
            return {
                ...state,
                invitado: action.payload
            }
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                products_copy: action.payload
            }
        case "ADD_TO_CART":
            if(state.cart.some(product => product._id === action.payload._id )) {
                return state
            }
            const updatedProduct = [...state.cart.filter(products => products._id !== action.payload._id ), action.payload]
            localStorage.setItem("CART", JSON.stringify(updatedProduct))
            return {
                ...state,
                cart: updatedProduct
            }
        case "DELETE_TO_CART":
            const removeProduct = state.cart.filter(product => product._id !== action.payload)
            localStorage.setItem("CART",JSON.stringify(removeProduct))
            return {
                ...state,
                cart: removeProduct
            }    
        case "ORDER_PRODUCTS":
            return {
                ...state,
                products: action.payload
            }            
        default:
            return state
    }
}


export default invitacionesReducer