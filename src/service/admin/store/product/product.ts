import Product from "@/models/admin/store/product/product";
import { IProduct } from "@/types/admin/store/product/product";
export const productService = {
  getAllProducts() {
    return Product.find({})
      .populate("category")
      .populate("subCategory")
      .populate("brand");
  },
  getProductById(id: string) {
    return Product.findById(id)
      .populate("category")
      .populate("subCategory")
      .populate("brand");
  },
  createProduct(product: IProduct) {
    return Product.create(product);
  },
  updateProduct(id: string, product: IProduct) {
    return Product.findByIdAndUpdate(id, product);
  },
  deleteProduct(id: string) {
    return Product.findByIdAndDelete(id);
  },
};
