import axios from "axios";
import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
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
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CART_REQUEST,
  PRODUCT_CART_SUCCESS,
  PRODUCT_CART_FAIL,
  PRODUCT_LIST_DETAILS_REQUEST,
  PRODUCT_LIST_DETAILS_SUCCESS,
  PRODUCT_LIST_DETAILS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_LIMITS_SUCCESS,
  PRODUCT_LIMITS_REQUEST,
  PRODUCT_LIMITS_FAIL,
} from "../constants/productConstants";

export const adminListProducts =
  (
    keyword = "",
    pageNumber = "",
    pageSize = "",
    sort = "",
    order = "",
    all = false
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: PRODUCT_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/products/${id}`);
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreateProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/admin/products", formData, config);

    dispatch({
      type: PRODUCT_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
    dispatch({
      type: PRODUCT_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/products/${id}`);

    dispatch({
      type: PRODUCT_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/admin/products/${id}`,
      formData,
      config
    );
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listProducts =
  (all = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });
      const { data } = await axios.get("/api/products", {
        params: { all },
      });
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const detailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const limitsByProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIMITS_REQUEST,
    });
    const { data } = await axios.get(`/api/products/${id}/limits`);
    dispatch({
      type: PRODUCT_LIMITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIMITS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
