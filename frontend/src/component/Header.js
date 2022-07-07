/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../action/userAction";
import Loading from "../component/Loading";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="navbar">
            <div className="nav-1">
              <img
                src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"
                alt="logo"
              />
            </div>
            <div
              className="nav-22"
              style={{ width: isAuthenticated ? "50%" : "50%" }}
            >
              <ul className="nav-2">
                <li className="nav-2-element">
                  <Link className="nav-2-links" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-2-element">
                  <Link className="nav-2-links" to="/products">
                    Shop
                  </Link>
                </li>
                {!isAuthenticated && (
                  <>
                    <li className="nav-2-element">
                      <Link className="nav-2-links" to="/signup">
                        SignUp
                      </Link>
                    </li>
                    <li className="nav-2-element">
                      <Link className="nav-2-links" to="/signin">
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <li className="nav-2-element">
                    <Link
                      className="nav-2-links"
                      to="/signin"
                      onClick={() => dispatch(logout())}
                    >
                      Sign Out
                    </Link>
                  </li>
                )}
                <li className="nav-2-element">
                  <Link className="nav-2-links" to="/">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
