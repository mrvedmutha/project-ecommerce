import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/enum/enumexports";
import { parseFormData } from "@/lib/api/common/formDataParsing";
import { ICloudinaryUploadResult } from "@/types/admin/store/cloudinary/cloudinaryUpload";
import { productService } from "@/service/admin/store/product/product";
import dbConnect from "@/lib/database/connectToDatabase";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  if (session) {
    if (
      session.user.role === Roles.CUSTOMER ||
      session.user.role === Roles.MARKETER ||
      session.user.role === Roles.INVENTORY
    ) {
      return errorResponse("Forbidden, Not Allowed!", 403);
    }
  }
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }

  try {
    const config = {
      title: "string",
      alias: "string",
      description: "string",
      shortDescription: "string",
      sku: "string",
      images: "string[]",
      buffer: "buffer[]",
      priceDetails: "string",
      taxDetails: "string",
      cogs: "number",
      profit: "number",
      margin: "number",
      package: "string",
      metafields: "string",
      stock: "string",
      category: "string",
      brand: "string",
      slug: "string",
      attributes: "string",
      tags: "string",
      vendor: "string",
    } as const;
    const data: any = await parseFormData(request, config);
    const buffers = data.buffer;
    const imgUrls: string[] = [];

    for (const [index, buffer] of buffers.entries()) {
      const result = await new Promise<ICloudinaryUploadResult>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
              public_id: `product_img_${Date.now()}_${index}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as ICloudinaryUploadResult);
              }
            }
          );

          stream.end(buffer);
        }
      );
      imgUrls.push(result.secure_url);
    }

    data.images = imgUrls;
    delete data.buffer;
    console.log(data); //TODO remove
    await dbConnect();
    const product = await productService.createProduct(data);
    return successResponse("Product created successfully", 200, product);
  } catch (error: any) {
    return errorResponse("Internal Sever Error", 500, error);
  }
}
