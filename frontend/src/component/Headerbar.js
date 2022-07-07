import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const Headerbar = ({ isAuthenticated, user }) => {
  return (
    <>
      <div className="nav-3">
        {isAuthenticated && (
          <div className="profile">
            <div>
              <IconContext.Provider
                value={{
                  className: "react-icon1",
                  color: "#38bdf8",
                  // style: {
                  //   marginTop: user.role === "admin" ? "0.9vmax" : "1.4vmax",
                  // },
                }}
              >
                <Link to="/myprofile">
                  <MdOutlineAccountCircle />
                </Link>
              </IconContext.Provider>
            </div>
            {user.role === "admin" ? (
              <div>
                <IconContext.Provider
                  value={{
                    className: "react-icon2",
                    color: "#38bdf8",
                  }}
                >
                  <Link to="/admin/dashboard">
                    <MdOutlineDashboard />
                  </Link>
                </IconContext.Provider>
              </div>
            ) : (
              <div className="react-icon2"></div>
            )}

            <div>
              <IconContext.Provider
                value={{
                  className: "react-icon3",
                  color: "#38bdf8",
                  // style: {
                  //   marginTop: user.role === "admin" ? "0.3vmax" : "0.7vmax",
                  // },
                }}
              >
                <Link to="/cart">
                  <RiShoppingCartLine />
                </Link>
              </IconContext.Provider>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Headerbar;
