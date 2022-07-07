/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../component/Loading";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import {
  clearError,
  updateProduct,
  getProductDetails,
} from "../action/productAction";
import "./NewProduct.css";
import { UPDATE_PRODUCT_RESET } from "../constants/productConstants";
import Sidebar from "./Sidebar.js";
import { message } from "antd";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    error: updateError,
    isUpdated,
    loading,
  } = useSelector((state) => state.deleteProduct);
  const { error, product } = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const categories = [
    "Men's Shirt",
    "Men's Tshirt",
    "Women's Dresses",
    "Televisions",
    "Men's Bottom",
    "Laptops",
    "SmartPhones",
    "Footwear",
    "Headphones",
  ];

  useEffect(() => {
    if (product && id !== product._id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setUrl(product.images[0].url);
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
      message.success(isUpdated);
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, message, isUpdated, error, navigate, id, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct(id, {
        name: name,
        description: description,
        price: price,
        stock: stock,
        category: category,
        images: [{ url: url }],
      })
    );
  };

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update product</h1>
            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Product Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Product Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Product Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Product Image"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              onClick={updateProductSubmitHandler}
            >
              Update Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
