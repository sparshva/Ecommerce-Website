/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import Home from "./component/Home.js";
import ProductDetails from "./component/ProductDetails.js";
import Products from "./component/Products.js";
import Signup from "./component/Signup.js";
import Signin from "./component/Signin.js";
import store from "./store";
import { load } from "./action/userAction";
import { useSelector } from "react-redux";
import Profile from "./component/Profile.js";
import EditProfile from "./component/EditProfile.js";
import UpdatePassword from "./component/UpdatePassword.js";
import ForgotPassword from "./component/ForgotPassword.js";
import ResetPassword from "./component/ResetPassword.js";
import Cart from "./component/Cart.js";
import Shipping from "./component/Shipping.js";
import ConfirmOrder from "./component/ConfirmOrder.js";
import Dashboard from "./component/Dashboard.js";
import ProductList from "./component/ProductList.js";
import NewProduct from "./component/NewProduct.js";
import UpdateProduct from "./component/UpdateProduct.js";
import UsersList from "./component/UsersList.js";
import UpdateUser from "./component/UpdateUser.js";
import ProductReviews from "./component/ProductReviews.js";

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(load());
  }, []);

  return (
    <>
      <Router>
        {/* <Header /> */}

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/product/:id" element={<ProductDetails />}></Route>
          <Route exact path="/products" element={<Products />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
          {isAuthenticated && (
            <Route
              exact
              path="/editmyprofile"
              element={<EditProfile />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/updatepassword"
              element={<UpdatePassword />}
            ></Route>
          )}

          <Route
            exact
            path="/forgotpassword"
            element={<ForgotPassword />}
          ></Route>
          <Route
            exact
            path="/resetpassword/:id/:token"
            element={<ResetPassword />}
          ></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          {isAuthenticated && (
            <Route exact path="/shipping" element={<Shipping />}></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/order/confirm"
              element={<ConfirmOrder />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/admin/dashboard"
              element={<Dashboard />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/admin/products"
              element={<ProductList />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route exact path="/admin/product" element={<NewProduct />}></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route exact path="/admin/users" element={<UsersList />}></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/admin/user/:id"
              element={<UpdateUser />}
            ></Route>
          )}
          {isAuthenticated && (
            <Route
              exact
              path="/admin/reviews"
              element={<ProductReviews />}
            ></Route>
          )}
        </Routes>

        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
