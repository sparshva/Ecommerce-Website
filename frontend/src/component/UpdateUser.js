/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../component/Loading";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { clearError, getUserDetails, updateUser } from "../action/userAction";
import "./NewProduct.css";
import { UPDATE_USER_RESET } from "../constants/userConstants";
import Sidebar from "./Sidebar.js";
import { message } from "antd";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setRole(user.role);
      setEmail(user.email);
      setName(user.name);
    }

    if (error) {
      message.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      message.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      message.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, message, error, isUpdated, updateError, navigate, user, id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(id, {
        name: name,
        role: role,
        email: email,
      })
    );
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Create a new product</h1>
              <div>
                <input
                  type="text"
                  placeholder="User Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="User Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Create Product
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
