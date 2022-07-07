import React from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   value: product.ratings,
  //   isHalf: true,
  //   size: window.innerWidth < 600 ? 20 : 25,
  // };

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <div className="productCardimage">
        <img src={product.images[0].url} alt={product.name} />
      </div>
      <div className="productCardinfo">
        <div className="para">
          <p>{product.name}</p>
        </div>
        <span>{`₹${product.price}`}</span>
        <div className="productCardratings">
          <span className="productCardSpan">{`${product.numofReviews} Reviews`}</span>
          <Rating {...options} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
