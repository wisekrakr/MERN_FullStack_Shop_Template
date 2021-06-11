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
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Computers",
        "Automotive",
        "Baby",
        "Beauty & Personal Care",
        "Woman's Fashion",
        "Men's Fashion",
        "Health & Household",
        "Home & Kitchen",
        "Industrial & Scientific",
        "Luggage",
        "Movies & Television",
        "Pet Supplies",
        "Arts & Crafts",
        "Software",
        "Sports & Outdoors",
        "Tools & Home Improvemen",
        "Toys & Games",
        "Video Games",
        "Books",
        "Food",
      ],
      message: "Please select correct category for this product",
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
