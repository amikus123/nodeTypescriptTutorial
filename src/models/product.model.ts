import { UserDocument } from "./user.model";
// import { customAlphabet } from "nanoid";
import mongoose from "mongoose";

// const nanoid = customAlphabet("abcdefg1234", 10);
export interface Product {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends Product, mongoose.Document {
  createdAt: Date;
  updatedAd: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${1}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);
export default ProductModel;
