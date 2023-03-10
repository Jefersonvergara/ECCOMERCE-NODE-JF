const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* Una función de middleware que se utiliza para validar la identificación de categoría. */
exports.validCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!category) {
    return next(new AppError('Category not found', 404));
  }

  req.category = category;
  next();
});
