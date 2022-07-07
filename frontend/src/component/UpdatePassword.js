/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { RiLockPasswordLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, updatePassword, load } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import { message } from "antd";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [updateuser, setUpdateuser] = useState({
    oldPassword: "",
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
      dispatch(updatePassword(updateuser));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      message.success("Password updated successfully");
      dispatch(load());
      navigate("/myprofile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, isUpdated, message, error, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />{" "}
          <div className="editmypassword ">
            <h2>Update</h2>
            <form>
              <div className="editpassword-align">
                <IconContext.Provider
                  value={{ className: "editpassword-icons" }}
                >
                  <RiLockPasswordLine />
                </IconContext.Provider>
                <div className="editpassword-box">
                  <label>Old Password</label>
                  <input
                    type="password"
                    className="editpassword-input"
                    name="oldPassword"
                    autoComplete="new-password"
                    onChange={handleUser}
                    required
                    placeholder="Enter your old password..."
                  />
                </div>
              </div>
              <div className="editpassword-align">
                <IconContext.Provider
                  value={{ className: "editpassword-icons" }}
                >
                  <RiLockPasswordLine />
                </IconContext.Provider>
                <div className="editpassword-box">
                  <label>New Password</label>
                  <input
                    type="password"
                    className="editpassword-input"
                    name="newPassword"
                    autoComplete="new-password"
                    onChange={handleUser}
                    required
                    placeholder="Enter your new password..."
                  />
                </div>
              </div>
              <div className="editpassword-align">
                <IconContext.Provider
                  value={{ className: "editpassword-icons" }}
                >
                  <RiLockPasswordLine />
                </IconContext.Provider>
                <div className="editpassword-box">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="editpassword-input"
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

export default UpdatePassword;
