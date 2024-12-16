import {
  GUEST_ADMIN_CREATE_FAIL,
  GUEST_ADMIN_CREATE_REQUEST,
  GUEST_ADMIN_CREATE_RESET,
  GUEST_ADMIN_CREATE_SUCCESS,
  GUEST_ADMIN_DELETE_FAIL,
  GUEST_ADMIN_DELETE_REQUEST,
  GUEST_ADMIN_DELETE_RESET,
  GUEST_ADMIN_DELETE_SUCCESS,
  GUEST_ADMIN_DETAILS_FAIL,
  GUEST_ADMIN_DETAILS_REQUEST,
  GUEST_ADMIN_DETAILS_RESET,
  GUEST_ADMIN_DETAILS_SUCCESS,
  GUEST_ADMIN_LIST_FAIL,
  GUEST_ADMIN_LIST_REQUEST,
  GUEST_ADMIN_LIST_RESET,
  GUEST_ADMIN_LIST_SUCCESS,
  GUEST_ADMIN_UPDATE_FAIL,
  GUEST_ADMIN_UPDATE_REQUEST,
  GUEST_ADMIN_UPDATE_SUCCESS,
} from "../constants/guestConstants";

export const adminGuestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case GUEST_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case GUEST_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case GUEST_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminGuestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case GUEST_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case GUEST_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case GUEST_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminGuestUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case GUEST_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case GUEST_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminGuestDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GUEST_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case GUEST_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        guestDetails: action.payload,
        success: true,
      };
    case GUEST_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GUEST_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminGuestListReducer = (state = { guests: [] }, action) => {
  switch (action.type) {
    case GUEST_ADMIN_LIST_REQUEST:
      return { loading: true };
    case GUEST_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        guests: action.payload.guests,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case GUEST_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case GUEST_ADMIN_LIST_RESET:
      return { guests: [] };
    default:
      return state;
  }
};
