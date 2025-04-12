import { IProductCategory } from "@/types/admin/store/product/category";
import ProductCategory from "@/models/admin/store/product/category";

export const categoryService = {
  getAllCategories() {
    return ProductCategory.find({}).populate("subCategory");
  },
  getCategoryById(id: string) {
    return ProductCategory.findById(id).populate("subCategory");
  },
  createCategory(category: IProductCategory) {
    return ProductCategory.create(category);
  },
  updateCategory(id: string, category: IProductCategory) {
    return ProductCategory.findByIdAndUpdate(id, category);
  },
  deleteCategory(id: string) {
    return ProductCategory.findByIdAndDelete(id);
  },
};

export default categoryService;
