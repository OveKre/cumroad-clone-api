const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      required: true,
    },
    downloadUrl: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal'],
      required: true,
    },
    paymentDetails: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// Create a virtual field to populate product information
orderSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

// Include virtuals when converting to JSON
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;