import axios from "axios";
import {
  CATEGORY_ADMIN_CREATE_FAIL,
  CATEGORY_ADMIN_CREATE_REQUEST,
  CATEGORY_ADMIN_CREATE_SUCCESS,
  CATEGORY_ADMIN_DELETE_FAIL,
  CATEGORY_ADMIN_DELETE_REQUEST,
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
  CATEGORY_ADMIN_UPDATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

export const adminCreateCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/categories",
      { category },
      config
    );

    dispatch({
      type: CATEGORY_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CATEGORY_ADMIN_LIST_RESET,
    });
    dispatch({
      type: CATEGORY_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDetailsCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/categories/${id}`);
    dispatch({
      type: CATEGORY_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminUpdateCategory = (id, category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/categories/${id}`,
      { category },
      config
    );
    dispatch({
      type: CATEGORY_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CATEGORY_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: CATEGORY_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/categories/${id}`);
    dispatch({
      type: CATEGORY_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CATEGORY_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminListCategories =
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
        type: CATEGORY_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/categories?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: CATEGORY_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORY_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
