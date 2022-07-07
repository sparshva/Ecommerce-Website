import React from "react";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <div
        className="searchField"
        style={{
          width: isAuthenticated ? "40.9%" : "44.6%",
          marginRight: isAuthenticated ? "8.57vmax" : "6.7vmax",
        }}
      >
        <input type="text" placeholder="Search a product..."></input>
        <button type="button" className="nav-3-button">
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
