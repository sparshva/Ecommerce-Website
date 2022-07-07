/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar.js";
import Headerbar from "./Headerbar.js";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrros } from "../action/productAction";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";

const Products = () => {
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
  let { products, loading, error } = useSelector((state) => state.products);

  const [category, setCategory] = useState("");
  const [value, setValue] = useState([0, 90000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  let productsDisplayed;

  if ((value[0] || value[1]) && category === "") {
    productsDisplayed = products.filter(
      (product) => product.price >= value[0] && product.price <= value[1]
    );
  }
  if (category) {
    productsDisplayed = products.filter(
      (product) =>
        product.price >= value[0] &&
        product.price <= value[1] &&
        product.category === category
    );
  }

  const handleChange = (event, newValue) => {
    // console.log(low, high, value);
    setValue(newValue);
  };

  function valuetext(value) {
    return `${value}°C`;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="flexit">
            <Headerbar isAuthenticated={isAuthenticated} user={user} />
            <SearchBar />
          </div>

          <h2 className="productsHeading">Products</h2>
          <div className="productpage">
            {/* <div className="productpage"> */}
            <div className="filter">
              <div className="slider">
                <h4> Price Slider</h4>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={90000}
                  />
                </Box>
              </div>
              <div className="category">
                <h4> Categories</h4>
                <div className="categoryList">
                  <h4 onClick={() => setCategory("")}>
                    {" "}
                    <span>* </span>
                    All
                  </h4>
                  {categories.map((cat) => (
                    <h4 onClick={() => setCategory(cat)}>
                      {" "}
                      <span>* </span>
                      {cat}
                    </h4>
                  ))}
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="products">
              {products &&
                productsDisplayed.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
