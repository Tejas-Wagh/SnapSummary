"use client";

import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading:boolean
};

const UploadFormInput = forwardRef<HTMLFormElement, Props>(
  ({ onSubmit,isLoading }, ref) => {
    return (
      <form action="" className="flex flex-col gap-6" onSubmit={onSubmit} ref={ref}>
        <div className="flex justify-end items-center gap-1.5 ">
          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
            disabled={isLoading}
            className={`${isLoading && "opacity-50 cursor-not-allowed"}`}
          />
          <Button disabled={isLoading}>{isLoading ?<>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...
          </>: "Upload your PDF"}</Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput"

export default UploadFormInput;
