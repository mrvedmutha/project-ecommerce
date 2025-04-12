import { IProductBrand } from "@/types/admin/store/product/brand";
import ProductBrand from "@/models/admin/store/product/brand";

export const brandService = {
  getAllBrands() {
    return ProductBrand.find({});
  },
  createBrand(brand: IProductBrand) {
    return ProductBrand.create(brand);
  },
  getBrandById(id: string) {
    return ProductBrand.findById(id);
  },
  updateBrand(id: string, brand: IProductBrand) {
    return ProductBrand.findByIdAndUpdate(id, brand);
  },
  deleteBrand(id: string) {
    return ProductBrand.findByIdAndDelete(id);
  },
};

export default brandService;
