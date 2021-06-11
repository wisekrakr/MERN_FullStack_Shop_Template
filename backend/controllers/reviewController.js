const Product = require("../models/product");
const Review = require("../models/review");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//create a review      POST =>   /api/v1/product/:id/post
exports.postReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let review = await Review.create({
    user: req.user._id,
    rating: Number(req.body.rating),
    comment: req.body.comment,
    product: product._id,
  });

  const newReviews = [];

  product.reviews.forEach(async (reviewId) => {
    const r = await Review.findById(reviewId);
    newReviews.push(r);
  });

  console.log("newReviews " + newReviews);

  const isReviewed = newReviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  console.log("isReviewed " + isReviewed);

  if (isReviewed) {
    // if reviewed, update the current review
    product.reviews.forEach(async (reviewId) => {
      if (newReview.user.toString() === req.user._id.toString()) {
        review = await Review.findByIdAndUpdate(reviewId);
      }
    });
  } else {
    // add new review to review list
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  var array = [];

  // update product rating
  product.reviews.forEach(async (reviewId) => {
    const newReview = await Review.findById(reviewId);

    array.push(newReview.rating);
  });

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  console.log("Rating: \n" + product.rating);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

//create a review      POST =>   /api/v1/product/:id/post
exports.postReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let review = await Review.create({
    user: req.user._id,
    rating: Number(req.body.rating),
    comment: req.body.comment,
    product: product._id,
  });

  product.reviews.forEach(async (reviewId) => {
    let updatedReview = await Review.findById(reviewId);

    // if reviewed, update the current review
    if (updatedReview.user === req.user._id) {
      updatedReview = await Product.findByIdAndUpdate(reviewId, review, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    } else {
      // add new review to review list
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }
  });

  // update product rating
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  console.log("Rating: \n" + product.rating);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
