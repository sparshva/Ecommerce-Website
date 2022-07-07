/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearError, login } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { message } from "antd";

const Signin = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",

    password: "",
  });

  const handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      dispatch(login(user));
    } catch (err) {
      console.log(err);
    }
  };
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // console.log(isAuthenticated, error);

  useEffect(() => {
    if (error && error !== "JsonWebTokenError") {
      message.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/");
      // message.success("Login Successful");
    }
  }, [dispatch, message, error, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="header">
            <div className="headerdiv">
              <Header />
            </div>

            <div className="signin-heading">
              <div className="Signin">
                <h2>Sign In</h2>
                <form>
                  <div className="signin-align">
                    <IconContext.Provider value={{ className: "signin-icons" }}>
                      <MdOutlineEmail />
                    </IconContext.Provider>

                    <div className="signin-box">
                      <label>Email</label>
                      <input
                        type="email"
                        className="signin-input"
                        name="email"
                        value={user.email}
                        onChange={handleUser}
                        required
                        autoComplete="new-password"
                        placeholder="Enter your email..."
                      />
                    </div>
                  </div>

                  <div className="signin-align">
                    <IconContext.Provider value={{ className: "signin-icons" }}>
                      <RiLockPasswordLine />
                    </IconContext.Provider>
                    <div className="signin-box">
                      <label>Password</label>
                      <input
                        type="password"
                        className="signin-input"
                        name="password"
                        value={user.password}
                        onChange={handleUser}
                        required
                        autoComplete="new-password"
                        placeholder="Enter your password..."
                      />
                    </div>
                  </div>

                  <div className="button ">
                    <input
                      type="submit"
                      value="Sign In"
                      className="signin-button"
                      onClick={postData}
                    />
                    <div className="signlinks">
                      <Link className="signup" to="/signup">
                        Not registered yet ? Sign Up
                      </Link>
                      <Link className="signup" to="/forgotpassword">
                        Forgot Password
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signin;
