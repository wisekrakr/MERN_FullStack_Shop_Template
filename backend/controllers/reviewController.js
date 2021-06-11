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

  const { rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    rating: Number(rating),
    comment,
    product: product._id,
  });

  for (const reviewId of product.reviews) {
    const r = await Review.findById(reviewId);

    if (r.user.toString() === req.user._id.toString()) {
      r.remove();
      product.reviews.pop(r);
      product.numberOfReviews -= 1;
    }
  }

  product.reviews.push(review);
  product.numberOfReviews = product.reviews.length;

  // update product rating
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    review,
  });
});

//get all reviews from a product    GET =>   /api/v1/product/:id/reviews
exports.getAllReviewsForOneProductById = catchAsyncErrors(
  async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let reviews = [];
    for (const reviewId of product.reviews) {
      const review = await Review.findById(reviewId);

      reviews.push(review);
    }

    res.status(200).json({
      success: true,
      totalReviewCount: reviews.length,
      reviews,
    });
  }
);

//get a review by id    GET =>   /api/v1/review/:id/
exports.getReviewById = catchAsyncErrors(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  res.status(200).json({
    success: true,
    review,
  });
});

//update a review   PUT =>   /api/v1/reviews/:id
exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(new ErrorHandler("Review not found", 404));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    review,
  });
});
