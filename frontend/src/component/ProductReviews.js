/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./ProductReviews.css";
import {
  clearError,
  getAllReviews,
  deleteReviews,
} from "../action/productAction";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useAlert } from "react-alert";
import Sidebar from "./Sidebar.js";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../constants/productConstants";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const Delete = (reviewid) => {
    dispatch(deleteReviews(reviewid, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

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
      message.success("Review Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, message, isDeleted, deleteError, navigate]);

  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    { field: "user", headerName: "User", minWidth: 200, flex: 0.6 },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 180,
      flex: 0.4,
      type: "number",
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
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
            <Button onClick={() => Delete(params.getValue(params.id, "id"))}>
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">GET REVIEWS</h1>
            <div>
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Find Reviews
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No reviews</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
