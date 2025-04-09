import Tiptap from "@/components/common/richTextEditor/richTextEditor";
import React from "react";
import { Input } from "@/components/ui/input";

const createProduct = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Create product</h1>
      <div className="flex mt-5 gap-3 items-center">
        <p className="text-lg font-medium">Product Title:</p>
        <Input type="text" />
      </div>
    </div>
  );
};

export default createProduct;
