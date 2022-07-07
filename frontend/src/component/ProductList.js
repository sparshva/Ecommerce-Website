/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./productList.css";
import {
  clearError,
  getAdminProduct,
  removeProduct,
} from "../action/productAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar.js";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../constants/productConstants";
import { message } from "antd";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const Delete = (id) => {
    dispatch(removeProduct(id));
  };

  const { deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
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
      message.success(isDeleted);
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, message, isDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
      type: "number",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 270,
      flex: 0.5,
      type: "number",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>
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

export default ProductList;
