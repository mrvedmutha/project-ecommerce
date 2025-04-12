export interface ISku {
  _id?: string;
  sku: {
    isSku?: boolean;
    code?: string;
    barcode?: string;
  };
}
