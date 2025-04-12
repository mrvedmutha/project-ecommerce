"use client";
import Tiptap from "@/components/common/richTextEditor/richTextEditor";
import * as React from "react";
import { IProduct } from "@/types/admin/store/product/product";
import { productZodSchema } from "@/schemas/zod/admin/store/product/product";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import RichTextEditor from "@/components/common/richTextEditor/richTextEditor";

const createProduct = () => {
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [isSlugEditing, setIsSlugEditing] = React.useState(false);
  const [hasSlugBeenManuallyEdited, setHasSlugBeenManuallyEdited] =
    React.useState(false);
  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const form = useForm<z.infer<typeof productZodSchema>>({
    resolver: zodResolver(productZodSchema),
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      slug: "",
      alias: "",
      images: [],
      priceDetails: [],
      taxDetails: {
        isTax: false,
        tax: {
          name: "",
          rate: 0,
        },
      },
      cogs: 0,
      profit: 0,
      margin: 0,
      package: {
        dimension: {
          length: 0,
          breath: 0,
          height: 0,
          measurement: "",
        },
        weight: {
          value: 0,
          measurement: "",
        },
      },
      metafields: {
        title: "",
        description: "",
      },
      stock: {
        isAvailable: false,
        quantity: 0,
      },
      category: "",
      brand: "",
      sku: {
        isSku: false,
        code: "",
        barcode: "",
      },
    },
  });
  React.useEffect(() => {
    const title = form.watch("title");
    if (!hasSlugBeenManuallyEdited) {
      form.setValue("slug", slugify(title));
    }
  }, [form.watch("title")]);
  return (
    <>
      <div className="w-full">
        <Form {...form}>
          <form>
            <div className="m-3">
              <h1 className="text-2xl font-semibold">Create Product</h1>
            </div>
            <div className="flex">
              <div className="w-3/4">
                <div className="mt-5">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <div className="px-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Title:
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter product title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="alias"
                      render={({ field }) => (
                        <div className="px-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Alias:
                            </FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Model Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <div className="px-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Slug:
                            </FormLabel>
                            <FormControl>
                              {isSlugEditing ? (
                                <Input
                                  {...field}
                                  onBlur={() => setIsSlugEditing(false)}
                                  autoFocus
                                  placeholder="Enter slug"
                                />
                              ) : (
                                <div
                                  className="px-3 py-2 border rounded-md bg-muted cursor-pointer text-sm"
                                  onClick={() => setIsSlugEditing(true)}
                                >
                                  {field.value || "Click to edit slug"}
                                </div>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <div className="px-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Description:
                            </FormLabel>
                            <FormControl>
                              <RichTextEditor
                                content={field.value}
                                onChange={field.onChange}
                                editorHeight="h-35"
                                editorDivClass="h-40 overflow-y-auto border rounded-md px-3 py-2"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <div className="px-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Short Description:
                            </FormLabel>
                            <FormControl>
                              <RichTextEditor
                                content={field.value}
                                onChange={field.onChange}
                                editorHeight="h-25"
                                editorDivClass="h-30 overflow-y-auto border rounded-md px-3 py-2"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <div className="px-4 mt-4">
                          <FormItem>
                            <FormLabel className="text-md font-semibold">
                              Upload Images:
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(
                                    e.target.files || []
                                  );
                                  const previews = files.map((file) =>
                                    URL.createObjectURL(file)
                                  );
                                  setImagePreviews(previews);

                                  // Optional: Also update form field if needed
                                  form.setValue("images", previews);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 gap-4">
                              {imagePreviews.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-auto object-cover rounded-md border"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </Card>
                </div>
              </div>
              <div className="w-2/4"></div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default createProduct;
