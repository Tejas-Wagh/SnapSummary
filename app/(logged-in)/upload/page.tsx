import BgGradient from "@/components/common/bg-gradient";
import UploadHeader from "@/components/upload/upload";
import UploadForm from "@/components/upload/upload-form";
import React from "react";

type Props = {};

const UploadPage = (props: Props) => {
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadPage;
