import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

import { Carousel } from "react-bootstrap";

import Spinner from "../layout/static/Spinner";
import MetaData from "../layout/MetaData";

import { getProductById } from "../../state/actions/productActions";
import { clearErrors } from "../../state/actions/alertActions";

const ProductInfo = ({
  match,
  getProductById,
  clearErrors,
  products: { product, loading, error },
}) => {
  const alert = useAlert();

  useEffect(() => {
    getProductById(match.params.id);
    if (error) {
      alert.error(error);
      clearErrors();
    }
  }, [getProductById, alert, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product-image">
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product-id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.rating / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no-of-reviews">
                ({product.numberOfReviews} Reviews)
              </span>

              <hr />

              <p id="product_price">€{product.price}</p>
              <div className="stockCounter d-inline">
                <span
                  className="btn btn-danger minus" /*onClick={decreaseQty}*/
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  /*value={quantity}*/ readOnly
                />

                <span
                  className="btn btn-primary plus" /*onClick={increaseQty}*/
                >
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart-btn"
                className="btn btn-primary d-inline ml-4"
                disabled={product.stock === 0} /*onClick={addToCart}*/
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock-status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product-vendor mb-3">
                Sold by: <strong>{product.vendor}</strong>
              </p>

              <div className="alert alert-danger mt-5" type="alert">
                Login to post your review.
              </div>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    /*id="ratingModal" */ tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            /*value={comment}*/
                            /*onChange={(e) => setComment(e.target.value)}*/
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            /*onClick={reviewHandler}*/ data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

ProductInfo.propTypes = {
  getProductById: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProductById, clearErrors })(
  ProductInfo
);
