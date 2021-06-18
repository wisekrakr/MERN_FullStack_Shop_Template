import React from "react";
import { Link } from "react-router-dom";

const Product = ({
  product: { price, rating, numberOfReviews, _id, name, images, category },
}) => {
  return (
    <div className="col-sm-9 col-md-6 col-lg-3 my-3 ">
      <div className="card p-3 rounded ">
        <img className="card-img-top " src={images[0]} alt="" />
        <span className="card-category">{category}</span>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${_id}`}>{name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(rating / 5) * 100}%` }}
              >
                {rating}
              </div>
            </div>
            <span id="no-of-reviews">{numberOfReviews} Reviews</span>
          </div>
          <p className="card-text">€{price}</p>
          <Link to={`/product/${_id}`} id="view-btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
