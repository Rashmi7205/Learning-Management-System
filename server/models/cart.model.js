import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const wishlistItemSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    wishlistItems: [wishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ user: 1 });

cartSchema.virtual('itemCount').get(function () {
  return this.items.length;
});

cartSchema.virtual('wishlistCount').get(function () {
  return this.wishlistItems.length;
});

cartSchema.methods.calculateTotal = async function () {
  await this.populate('items.course', 'price discountPrice');

  let total = 0;
  this.items.forEach((item) => {
    const price = item.course.discountPrice || item.course.price;
    total += price;
  });

  return total;
};

cartSchema.methods.isInCart = function (courseId) {
  return this.items.some((item) => item.course.toString() === courseId.toString());
};

cartSchema.methods.isInWishlist = function (courseId) {
  return this.wishlistItems.some((item) => item.course.toString() === courseId.toString());
};

export const Cart = mongoose.model('Cart', cartSchema);
