/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { message } from "antd";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, forgotPassword, load } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const handleUser = (e) => {
    setEmail(e.target.value);
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      dispatch(forgotPassword(email));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }

    if (message) {
      message.success(message);
    }
  }, [dispatch, message, error, message]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="Signup">
            <h2>Forgot Password</h2>
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
                    onChange={handleUser}
                    required
                    autoComplete="new-password"
                    placeholder="Enter your email..."
                  />
                </div>
              </div>

              <div className="button">
                <input
                  type="submit"
                  value="Update"
                  className="signup-button"
                  onClick={postData}
                />
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
