/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { RiLockPasswordLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, resetPassword, load } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id, token } = useParams();

  //   const { user } = useSelector((state) => state.user);

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [updateuser, setUpdateuser] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateuser({ ...updateuser, [name]: value });
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      dispatch(resetPassword(id, token, updateuser));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (success) {
      message.success("Password updated successfully");

      navigate("/signin");
    }
  }, [dispatch, success, message, error, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="Signup">
            <h2>Reset</h2>
            <form>
              <div className="signup-align">
                <IconContext.Provider value={{ className: "signup-icons" }}>
                  <RiLockPasswordLine />
                </IconContext.Provider>
                <div className="signup-box">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="signup-input"
                    name="newPassword"
                    autoComplete="new-password"
                    onChange={handleUser}
                    required
                    placeholder="Enter your new password..."
                  />
                </div>
              </div>
              <div className="signup-align">
                <IconContext.Provider value={{ className: "signup-icons" }}>
                  <RiLockPasswordLine />
                </IconContext.Provider>
                <div className="signup-box">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="signup-input"
                    name="confirmNewPassword"
                    onChange={handleUser}
                    autoComplete="new-password"
                    required
                    placeholder="Enter your new password again..."
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

export default ResetPassword;
