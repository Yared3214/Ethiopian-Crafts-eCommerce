import mongoose, { Schema, model, Document, Types } from "mongoose";

// 🧾 Order Item Interface
export interface IOrderItem {
  ProductItem: Types.ObjectId; // reference to Product
  ProductName?: string; // product title/name
  productImage?: string; // product image URL
  quantity: number;
  price?: number;
}

// 🧾 Order Interface
export interface IOrder extends Document {
  user: Types.ObjectId; // reference to User
  cartId: Types.ObjectId; // reference to Cart
  OrderItems: IOrderItem[];
  total_price: number;
  tx_ref?: string; // transaction reference (optional)
  payment_status: "pending" | "paid" | "failed";
  order_status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// 🧱 OrderItem Schema
const OrderItemSchema = new Schema<IOrderItem>(
  {
    ProductItem: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    ProductName: {
      type: String,
      trim: true,
    },
    productImage: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

// 🧱 Order Schema
const OrderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    OrderItems: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
    tx_ref: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🧩 Model Export
const Order = model<IOrder>("Order", OrderSchema);
export default Order;
