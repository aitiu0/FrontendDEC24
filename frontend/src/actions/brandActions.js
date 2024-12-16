import axios from "axios";
import {
  BRAND_ADMIN_CREATE_FAIL,
  BRAND_ADMIN_CREATE_REQUEST,
  BRAND_ADMIN_CREATE_SUCCESS,
  BRAND_ADMIN_DELETE_FAIL,
  BRAND_ADMIN_DELETE_REQUEST,
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
  BRAND_ADMIN_UPDATE_SUCCESS,
  BRAND_LIST_FAIL,
  BRAND_LIST_REQUEST,
  BRAND_LIST_RESET,
  BRAND_LIST_SUCCESS,
} from "../constants/brandConstants";

export const adminCreateBrand = (brand) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/admin/brands", brand, config);

    dispatch({
      type: BRAND_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: BRAND_ADMIN_LIST_RESET,
    });
    dispatch({
      type: BRAND_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: BRAND_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDetailsBrand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/brands/${id}`);
    dispatch({
      type: BRAND_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminUpdateBrand = (id, brand) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/admin/brands/${id}`, brand, config);
    dispatch({
      type: BRAND_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: BRAND_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: BRAND_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: BRAND_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/brands/${id}`);
    dispatch({
      type: BRAND_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: BRAND_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: BRAND_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminListBrands =
  (
    keyword = "",
    pageNumber = "",
    pageSize = "",
    sort = "",
    order = "",
    all = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: BRAND_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/brands?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: BRAND_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BRAND_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
