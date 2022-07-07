/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import Header from "./Header.js";

const Profile = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // useEffect(() => {});

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="profile-container">
            <div className="profile-pic">
              <IconContext.Provider
                value={{
                  style: { fontSize: "10vmax" },
                }}
              >
                <RiAccountPinCircleLine />
              </IconContext.Provider>

              <div className="profile-edit">
                <button type="button" className="profile-edit-button-1">
                  My Orders
                </button>
                <Link to="/editmyprofile">
                  <button type="button" className="profile-edit-button-2">
                    Edit My Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="profile-info">
              <div>
                <h5>Name </h5>

                <h6>{user.name} </h6>
                {/* <br></br> */}
              </div>

              <div>
                <h5>Email </h5>

                <h6>{user.email}</h6>
                {/* <br></br> */}
              </div>

              <div>
                <h5>Contact No </h5>

                <h6>{user.phone}</h6>
                {/* <br></br> */}
              </div>

              {/* <div className="change-password"> */}
              <Link to="/updatepassword">
                <button type="button" className="change-password-button">
                  Change Password
                </button>
              </Link>
              {/* </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
