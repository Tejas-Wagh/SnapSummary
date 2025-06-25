import UploadHeader from "@/components/upload/upload";
import UploadForm from "@/components/upload/upload-form";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const UploadPage = async (props: Props) => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/sign-in");
  }

  const userId = user.id;

  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if (hasReachedLimit) {
    redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
};

export default UploadPage;
