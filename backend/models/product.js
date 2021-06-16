const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxlength: [9, "Product name cannot exceed 9 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    enum: {
      values: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: [true, "Please select category for this product"],
        },
      ],
      // message: "Please select correct category for this product",
    },
  },
  vendor: {
    type: String,
    required: [true, "Please enter product vendor"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxlength: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
