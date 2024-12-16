import axios from "axios";
import {
  GUEST_ADMIN_CREATE_FAIL,
  GUEST_ADMIN_CREATE_REQUEST,
  GUEST_ADMIN_CREATE_SUCCESS,
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
  GUEST_ADMIN_DELETE_FAIL,
  GUEST_ADMIN_DELETE_REQUEST,
  GUEST_ADMIN_DELETE_SUCCESS,
} from "../constants/guestConstants";

export const adminListGuests =
  (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GUEST_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/guest?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
      );
      dispatch({
        type: GUEST_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GUEST_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsGuest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GUEST_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/guests/${id}`);
    dispatch({
      type: GUEST_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GUEST_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreateGuest = (guest) => async (dispatch) => {
  console.log(guest);
  console.log("adminCreateGuest");
  try {
    dispatch({
      type: GUEST_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/guest",
      { guest },
      config
    );

    dispatch({
      type: GUEST_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: GUEST_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: GUEST_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteGuest = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GUEST_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/guests/${id}`);

    dispatch({
      type: GUEST_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: GUEST_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GUEST_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateGuest =
  (id, guest, password) => async (dispatch) => {
    try {
      dispatch({
        type: GUEST_ADMIN_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/admin/guests/${id}`,
        { guest, password },
        config
      );
      dispatch({
        type: GUEST_ADMIN_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: GUEST_ADMIN_DETAILS_RESET,
        payload: data,
      });
      dispatch({
        type: GUEST_ADMIN_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: GUEST_ADMIN_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
