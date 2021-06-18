const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//get all categories        GET =>    /api/v1/categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categoryCount: categories.length,
    categories,
  });
});

//create a new category      POST =>   /api/v1/admin/categories/post
exports.postCategory = catchAsyncErrors(async (req, res, next) => {
  const { value } = req.body;

  //TODO might get MongoError when value is not unique

  const category = await Category.create({
    value,
    createdAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    category,
  });
});

//get single category by id     GET  =>   /api/v1/category/:id
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    category,
  });
});

//update category      PUT   =>   /api/v1/admin/category/:id
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  category.value = req.body.value;
  category.createdAt = Date.now();

  await category.save();

  res.status(200).json({
    success: true,
  });
});

//delete category    =>   /api/v1/admin/category/:id
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: "Category successfully removed",
  });
});
