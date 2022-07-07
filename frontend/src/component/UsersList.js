/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./productList.css";
import {
  clearError,
  getAllUsers,
  deleteUser,
  getUserDetails,
} from "../action/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar.js";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_USER_RESET } from "../constants/userConstants";
import { message } from "antd";

const UserList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const Delete = (id) => {
    dispatch(deleteUser(id));
  };

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      message.error(deleteError);
      dispatch(clearError());
    }
    if (isDeleted) {
      message.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, message, isDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "User Id", minWidth: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greencolor"
          : "redcolor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              Edit
            </Link>
            <Button onClick={() => Delete(params.getValue(params.id, "id"))}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
