import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, register } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";
import Header from "./Header";
import { message } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      dispatch(register(user));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/");
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
            <div className="signup-heading">
              <div className="Signup">
                <h2>Sign Up</h2>
                <form method="post">
                  <div className="divideinputs">
                    <div className="signup-align">
                      <IconContext.Provider
                        value={{ className: "signup-icons" }}
                      >
                        <MdAccountCircle />
                      </IconContext.Provider>
                      <div className="signup-box">
                        <label>Username</label>
                        <input
                          type="text"
                          className="signup-input"
                          name="name"
                          value={user.name}
                          onChange={handleUser}
                          required
                          placeholder="Enter your username..."
                        />
                      </div>
                    </div>
                    <div className="signup-align">
                      <IconContext.Provider
                        value={{ className: "signup-icons" }}
                      >
                        <FiSmartphone />
                      </IconContext.Provider>

                      <div className="signup-box">
                        <label>Phone</label>
                        <input
                          type="number"
                          className="signup-input"
                          name="phone"
                          value={user.phone}
                          onChange={handleUser}
                          required
                          placeholder="Enter your phone number..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signup-align signup-email">
                    <IconContext.Provider value={{ className: "signup-icons" }}>
                      <MdOutlineEmail />
                    </IconContext.Provider>
                    <div className="signup-box">
                      <label>Email</label>
                      <input
                        type="email"
                        className="signup-input"
                        name="email"
                        value={user.email}
                        onChange={handleUser}
                        required
                        placeholder="Enter your email..."
                      />
                    </div>
                  </div>
                  <div className="divideinputs">
                    <div className="signup-align">
                      <IconContext.Provider
                        value={{ className: "signup-icons" }}
                      >
                        <RiLockPasswordLine />
                      </IconContext.Provider>
                      <div className="signup-box">
                        <label>Password</label>
                        <input
                          type="password"
                          className="signup-input"
                          name="password"
                          value={user.password}
                          onChange={handleUser}
                          required
                          placeholder="Enter your password..."
                        />
                      </div>
                    </div>
                    <div className="signup-align">
                      <IconContext.Provider
                        value={{ className: "signup-icons" }}
                      >
                        <RiLockPasswordLine />
                      </IconContext.Provider>
                      <div className="signup-box">
                        <label>Confirm</label>
                        <input
                          type="password"
                          className="signup-input"
                          name="confirmpassword"
                          value={user.confirmpassword}
                          onChange={handleUser}
                          required
                          placeholder="Enter your password again..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signinbutton">
                    <input
                      type="submit"
                      value="Sign Up"
                      className="signup-button"
                      onClick={postData}
                    />
                    <Link className="signin" to="/signin">
                      Already a User ? SignIn
                    </Link>
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

export default Login;
