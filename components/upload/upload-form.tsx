"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary } from "@/actions/upload-actions";

type Props = {};
const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less that 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

const UploadForm = (props: Props) => {

  const [isLoading,setIsLoading]=useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const {startUpload,routeConfig} = useUploadThing("pdfUploader",{
    onClientUploadComplete:()=>{
      console.log("upload successfully!");
    },
    onUploadError:()=>{
      console.error("error occured while uploading");
      toast("Upload Failed!")
    },
    onUploadBegin:()=>{
      console.log("upload has begun for")
    }
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validate the file

    
    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
      );
      toast("Something went wrong");
      setIsLoading(false);
      return;
    }

    toast("Uploading PDF!")

    const response = await startUpload([file]);

    if(!response){
      toast("Something went wrong")
      setIsLoading(false);
    }

    toast("Processing PDF!")
    const result = await generatePDFSummary(response);
    
    const {data,message}= result || {};
    try{
      if(data){
        toast("Saving PDF");
        formRef?.current?.reset();
        setIsLoading(false);
      }

    }catch(err){
      toast("Error occured");
        formRef?.current?.reset();
        setIsLoading(false);
    }
   
    setIsLoading(false);
  }
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} ref={formRef} isLoading = {isLoading}/>
    </div>
  );
};

export default UploadForm;
