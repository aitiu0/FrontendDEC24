import {
  CATEGORY_ADMIN_CREATE_FAIL,
  CATEGORY_ADMIN_CREATE_REQUEST,
  CATEGORY_ADMIN_CREATE_SUCCESS,
  CATEGORY_ADMIN_DELETE_FAIL,
  CATEGORY_ADMIN_CREATE_RESET,
  CATEGORY_ADMIN_DELETE_REQUEST,
  CATEGORY_ADMIN_DELETE_RESET,
  CATEGORY_ADMIN_DELETE_SUCCESS,
  CATEGORY_ADMIN_DETAILS_FAIL,
  CATEGORY_ADMIN_DETAILS_REQUEST,
  CATEGORY_ADMIN_DETAILS_RESET,
  CATEGORY_ADMIN_DETAILS_SUCCESS,
  CATEGORY_ADMIN_LIST_FAIL,
  CATEGORY_ADMIN_LIST_REQUEST,
  CATEGORY_ADMIN_LIST_RESET,
  CATEGORY_ADMIN_LIST_SUCCESS,
  CATEGORY_ADMIN_UPDATE_FAIL,
  CATEGORY_ADMIN_UPDATE_REQUEST,
  CATEGORY_ADMIN_UPDATE_RESET,
  CATEGORY_ADMIN_UPDATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

export const adminCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case CATEGORY_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminCategoryDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case CATEGORY_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        categoryDetails: action.payload,
      };
    case CATEGORY_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminCategoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case CATEGORY_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case CATEGORY_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminCategoryListReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_ADMIN_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case CATEGORY_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADMIN_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};
