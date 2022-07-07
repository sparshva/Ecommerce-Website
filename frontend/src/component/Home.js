/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "antd/dist/antd.min.css";
import { message } from "antd";
import ProductCard from "./ProductCard.js";
import MetaData from "./MetaData.js";
import { getProduct } from "../action/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useAlert } from "react-alert";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import Header from "./Header.js";
import SearchBar from "./SearchBar.js";
import Headerbar from "./Headerbar.js";
import ProductCategory from "./ProductCategory.js";

const Home = () => {
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

  // const carouselCategory = (cat) => {
  //   let cararray = [];
  //   for (let i = 0; i < cat.length; i = i + 3) {
  //     cararray.push(
  //       <div style={{ display: "flex", flexDirection: "row" }}>
  //         <ProductCard product={cat[i]} />
  //         <ProductCard product={cat[i + 1]} />
  //         <ProductCard product={cat[i + 2]} />
  //       </div>
  //     );
  //   }
  //   return cararray;
  // };

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(products);
  useEffect(() => {
    if (error) {
      return message.error(error);
    }

    dispatch(getProduct());
  }, [message, dispatch, error]);

  // const result = products.filter(
  //   (product) => product.category === "Men's Shirt"
  // );
  // console.log("result", result);

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  // console.log("resultnew", sliceIntoChunks(result, 4));
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="homepage">
            <MetaData title="Ecommerce" />
            <Header />
            <div className="flexit">
              <Headerbar isAuthenticated={isAuthenticated} user={user} />
              <SearchBar />
            </div>
            <div className="carousel">
              <div className="image">
                <h1>Find Amazing Products</h1>
                <h1>At Minimal Rates</h1>
              </div>
            </div>
            {categories.map((cate) => (
              <>
                {" "}
                <div className="white-curve">
                  <h2 className="homeHeading">{cate}</h2>
                </div>
                {}
                <Carousel autoplay autoplaySpeed={7000} speed={2000}>
                  {sliceIntoChunks(
                    products.filter((product) => product.category === cate),
                    4
                  ).map((arr) => (
                    <div>
                      <div className="carcat">
                        {arr.map((prod) => (
                          <ProductCard product={prod} />
                        ))}
                      </div>
                    </div>
                  ))}
                </Carousel>
              </>
            ))}

            {/* <div className="white-curve">
              <h2 className="homeHeading">Men's Shirt</h2>
            </div>
            <Carousel effect="fade">
              {sliceIntoChunks(result, 4).map((arr) => (
                <div>
                  <div className="carcat">
                    {arr.map((prod) => (
                      <ProductCard product={prod} />
                    ))}
                  </div>
                </div>
              ))}
            </Carousel> */}

            {/* <div className="home">
              <div className="container" id="container">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
