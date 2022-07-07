import React from "react";
import ProductCard from "./ProductCard";

const ProductCategory = ({ category, products }) => {
  return (
    <>
      <div className="white-curve">
        <h2 className="homeHeading">{category}</h2>
      </div>
    </>
  );
};

export default ProductCategory;
