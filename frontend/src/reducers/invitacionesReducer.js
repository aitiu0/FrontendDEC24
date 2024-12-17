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
            const updatedProduct = [...state.cart, action.payload]
            localStorage.setItem("CART", JSON.stringify(updatedProduct))
            return {
                ...state,
                cart: updatedProduct
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