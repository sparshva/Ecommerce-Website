/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { clearError, createProduct } from "../action/productAction";
import "./NewProduct.css";
import { message } from "antd";
import { CREATE_PRODUCT_RESET } from "../constants/productConstants";
import Sidebar from "./Sidebar.js";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);
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
    if (error) {
      message.error(error);
      dispatch(clearError());
    }

    if (success) {
      message.success("Product created successfully");
      // navigate("/admin/dashboard");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, message, success, error, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProduct({
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
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create a new product</h1>
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
            >
              Create Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
