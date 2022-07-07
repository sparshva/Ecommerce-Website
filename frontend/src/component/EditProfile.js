import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { FiSmartphone } from "react-icons/fi";
import { message } from "antd";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, updateProfile, load } from "../action/userAction";
import { useAlert } from "react-alert";
import Loading from "../component/Loading";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Header from "./Header";

const EditProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log("user is     ", user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [updateuser, setUpdateuser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleUser = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUpdateuser({ ...updateuser, [name]: value });
  };

  // console.log(`updated user is ${updateuser}`);

  const postData = async (e) => {
    try {
      e.preventDefault();
      dispatch(updateProfile(updateuser));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // if (user) {
    //   setUpdateuser({ ...updateuser,  });
    // }
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      message.success("Profile updated successfully");
      dispatch(load());
      navigate("/myprofile");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, message, error, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Header />
          <div className="editmyprofile">
            <h2>Update</h2>
            <form className="editmyprofileform">
              <div className="editprofile-align">
                <IconContext.Provider
                  value={{ className: "editprofile-icons" }}
                >
                  <MdAccountCircle />
                </IconContext.Provider>
                <div className="editprofile-box">
                  <label>Username</label>
                  <input
                    type="text"
                    className="editprofile-input"
                    name="name"
                    // value={"ppp"}
                    onChange={handleUser}
                    autoComplete="new-password"
                    required
                    placeholder="Enter your username..."
                  />
                </div>
              </div>
              <div className="editprofile-align">
                <IconContext.Provider
                  value={{ className: "editprofile-icons" }}
                >
                  <MdOutlineEmail />
                </IconContext.Provider>

                <div className="editprofile-box">
                  <label>Email</label>
                  <input
                    type="email"
                    className="editprofile-input"
                    name="email"
                    // value={user.email}
                    autoComplete="new-password"
                    onChange={handleUser}
                    required
                    placeholder="Enter your email..."
                  />
                </div>
              </div>
              <div className="editprofile-align">
                <IconContext.Provider
                  value={{ className: "editprofile-icons" }}
                >
                  <FiSmartphone />
                </IconContext.Provider>
                <div className="editprofile-box">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="editprofile-input"
                    name="phone"
                    // value={user.phone}
                    autoComplete="new-password"
                    onChange={handleUser}
                    required
                    placeholder="Enter your phone..."
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

export default EditProfile;
