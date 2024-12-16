import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_VERIFICATION_STATUS_REQUEST,
  USER_VERIFICATION_STATUS_SUCCESS,
  USER_VERIFICATION_STATUS_FAIL,
  USER_VERIFICATION_REQUEST,
  USER_VERIFICATION_SUCCESS,
  USER_VERIFICATION_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_ARTIST_TYPE_REQUEST,
  USER_ARTIST_TYPE_FAIL,
  USER_ARTIST_TYPE_SUCCESS,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_FORGOT_STATUS_REQUEST,
  USER_FORGOT_STATUS_SUCCESS,
  USER_FORGOT_STATUS_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_FAIL,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_ADMIN_REGISTER_REQUEST,
  USER_ADMIN_REGISTER_SUCCESS,
  USER_ADMIN_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (username, password, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { username, password, token },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const getLoginData = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/users/islogged");
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  await axios.get("/api/users/logout");
  document.location.href = "/login";
};

export const register =
  (name, lastName, username, email, password, token) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const user = { name, lastName, username, email, password, token };
      const { data } = await axios.post("/api/users/signup", { user }, config);
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
export const verifyUserStatus = (id, verifyid) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFICATION_STATUS_REQUEST,
    });
    const { data } = await axios.get(`/api/users/status/${id}/${verifyid}`);
    dispatch({
      type: USER_VERIFICATION_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFICATION_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const verifyUser = (id, verifyid) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFICATION_REQUEST,
    });
    const { data } = await axios.get(`/api/users/verify/${id}/${verifyid}`);
    dispatch({
      type: USER_VERIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_VERIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    const { data } = await axios.get("/api/users/profile");
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put("/api/users/profile", formData, config);
    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listUsers =
  (keyword = "", pageNumber = "", pageSize = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/users?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response;
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };
export const removeListUsers = () => async (dispatch) => {
  dispatch({ type: USER_LIST_RESET });
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/user/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};
export const updateAdminUserProfile = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ADMIN_UPDATE_REQUEST,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(`/api/admin/user/${id}`, formData, config);
    dispatch({
      type: USER_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: USER_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminRegister =
  (name, lastName, username, email, userType, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_ADMIN_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const user = { name, lastName, username, email, userType, password };
      const { data } = await axios.post(
        "/api/admin/user/register",
        { user },
        config
      );
      dispatch({
        type: USER_ADMIN_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADMIN_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
