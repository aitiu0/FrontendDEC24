import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_RESET,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_RESET,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DETAILS_FAIL,
  PRODUCT_ADMIN_DETAILS_REQUEST,
  PRODUCT_ADMIN_DETAILS_RESET,
  PRODUCT_ADMIN_DETAILS_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_LIST_DETAILS_REQUEST,
  PRODUCT_LIST_DETAILS_SUCCESS,
  PRODUCT_LIST_DETAILS_FAIL,
  PRODUCT_LIST_DETAILS_RESET,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_LIMITS_REQUEST,
  PRODUCT_LIMITS_SUCCESS,
  PRODUCT_LIMITS_FAIL,
  PRODUCT_LIMITS_RESET,
} from "../constants/productConstants";

export const adminProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case PRODUCT_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case PRODUCT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case PRODUCT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        productDetails: action.payload,
      };
    case PRODUCT_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case PRODUCT_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};
export const productsListReducer = (
  state = { products: [], filterLimits: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const productLimitsReducer = (state = { filterLimits: {} }, action) => {
  switch (action.type) {
    case PRODUCT_LIMITS_REQUEST:
      return { loading: true };
    case PRODUCT_LIMITS_SUCCESS:
      return {
        loading: false,
        success: true,
        filterLimits: action.payload,
      };
    case PRODUCT_LIMITS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIMITS_RESET:
      return { filterLimits: {} };
    default:
      return state;
  }
};
