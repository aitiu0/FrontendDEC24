import {
  BRAND_ADMIN_CREATE_FAIL,
  BRAND_ADMIN_CREATE_REQUEST,
  BRAND_ADMIN_CREATE_RESET,
  BRAND_ADMIN_CREATE_SUCCESS,
  BRAND_ADMIN_DELETE_FAIL,
  BRAND_ADMIN_DELETE_REQUEST,
  BRAND_ADMIN_DELETE_RESET,
  BRAND_ADMIN_DELETE_SUCCESS,
  BRAND_ADMIN_DETAILS_FAIL,
  BRAND_ADMIN_DETAILS_REQUEST,
  BRAND_ADMIN_DETAILS_RESET,
  BRAND_ADMIN_DETAILS_SUCCESS,
  BRAND_ADMIN_LIST_FAIL,
  BRAND_ADMIN_LIST_REQUEST,
  BRAND_ADMIN_LIST_RESET,
  BRAND_ADMIN_LIST_SUCCESS,
  BRAND_ADMIN_UPDATE_FAIL,
  BRAND_ADMIN_UPDATE_REQUEST,
  BRAND_ADMIN_UPDATE_RESET,
  BRAND_ADMIN_UPDATE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_RESET,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstants";

export const adminBrandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case BRAND_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case BRAND_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminBrandDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case BRAND_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        brandDetails: action.payload,
      };
    case BRAND_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminBrandUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case BRAND_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case BRAND_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminBrandDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case BRAND_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case BRAND_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminBrandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_ADMIN_LIST_REQUEST:
      return { loading: true };
    case BRAND_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        brands: action.payload.brands,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case BRAND_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADMIN_LIST_RESET:
      return { brands: [] };
    default:
      return state;
  }
};
