/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearError,
} from "../action/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loading from "./Loading";
import { addItemsToCart } from "../action/cartAction";
import { useAlert } from "react-alert";
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import { message } from "antd";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const alert = useAlert();

  const { id } = useParams();

  const dispatch = useDispatch();
  //   dispatch(getProductDetails(id));

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, err } = useSelector((state) => state.newReview);
  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };
  const addItemsToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Added to cart successfully");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(newReview({ rating: rating, comment: comment, productId: id }));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (err) {
      message.error(err);
      dispatch(clearError());
    }
    if (success) {
      message.success(success);
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, message, error, err, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="productDetails">
            <div>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    src={item.url}
                    key={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{` ₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addItemsToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  <b className={product.Stock < 1 ? "redcolor" : "greencolor"}>
                    {product.Stock < 1 ? "Out of stock" : "In stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => {
                  setRating(e.target.value);
                }}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
