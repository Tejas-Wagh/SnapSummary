import { FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { hasReachedUploadLimit } from "@/lib/user";

type Props = {};

const NoSummary = async(props: Props) => {

  const user = await currentUser();
    const userId = user?.id;
  
    if (!userId) {
      return redirect("/sign-in");
    }
  
    const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimitt(
      userId as string
    );

  return (
    <div className="text-center py-12">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-semibold text-gray-600">
          No summaries yet
        </h2>
        <p className="text-gray-500 max-w-md">
          Upload your first PDF to get started with AI-powered summaries
        </p>
        <Link href={"/upload"}>
          <Button
            variant={"link"}
            className="text-white bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:no-underline"
          >
            Create Your First Summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NoSummary;
