/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_RESET,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_RESET,
} from "../constants/userConstants";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:3001/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data,
      });
    }
  };

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await axios.post("http://localhost:3001/register", user, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const load = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.get("http://localhost:3001/me");
    console.log(data);
    if (data.name === "JsonWebTokenError") {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: "JsonWebTokenError",
      });
    } else {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("http://localhost:3001/logout", { withCredentials: false });

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put("http://localhost:3001/myprofile/update", userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

export const updatePassword =
  ({ oldPassword, newPassword, confirmNewPassword }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
      });
      console.log("password request went");
      const { data } = await axios.put(
        "http://localhost:3001/myprofile/updatepassword",
        { oldPassword, newPassword, confirmNewPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data,
      });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      "http://localhost:3001/forgot-password",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(data);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

export const resetPassword = (id, token, passwords) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    // console.log("action");
    const { data } = await axios.put(
      `http://localhost:3001/reset-password/${id}/${token}`,
      passwords,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log(data);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USERS_REQUEST,
    });

    const { data } = await axios.get("http://localhost:3001/users");

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:3001/user/${id}`);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    const { data } = await axios.put(`http://localhost:3001/user/${id}`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_USER_REQUEST,
    });

    const { data } = await axios.delete(`http://localhost:3001/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data,
    });
  }
};

//Clearing errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
