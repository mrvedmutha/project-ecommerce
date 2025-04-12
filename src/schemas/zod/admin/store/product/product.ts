import * as z from "zod";
export const productZodSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  shortDescription: z
    .string()
    .min(3, { message: "Short Description must be at least 3 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
  alias: z.string().min(3, { message: "Alias must be at least 3 characters" }),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
  priceDetails: z.array(
    z.object({
      price: z.number(),
      salePrice: z.number(),
      currency: z.string(),
      isBaseCurrency: z.boolean(),
    })
  ),
  taxDetails: z.object({
    isTax: z.boolean(),
    tax: z.object({
      name: z.string(),
      rate: z.number(),
    }),
  }),
  cogs: z.number(),
  profit: z.number(),
  margin: z.number(),
  package: z.object({
    dimension: z.object({
      length: z.number(),
      breath: z.number(),
      height: z.number(),
      measurement: z.string(),
    }),
    weight: z.object({
      value: z.number(),
      measurement: z.string(),
    }),
  }),
  metafields: z.object({
    title: z.string(),
    description: z.string(),
  }),
  category: z.string(),
  brand: z.string(),
  vendor: z.string(),
  stock: z.object({
    isAvailable: z.boolean(),
    quantity: z.number(),
  }),
  sku: z.object({
    isSku: z.boolean(),
    code: z.string(),
    barcode: z.string(),
  }),
});
