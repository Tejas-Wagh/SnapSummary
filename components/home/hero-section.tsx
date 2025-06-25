import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
} from "../common/motion-wrapper";
import { containerVariants, itemVariants } from "@/lib/constants";

type Props = {};

const buttonVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};

const HeroSection = (props: Props) => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <MotionDiv
          variants={itemVariants}
          className="relative group max-w-[171px] p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x"
        >
          <Badge
            variant={"secondary"}
            className="relative  px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </MotionDiv>

        <MotionDiv variants={itemVariants}>
          <MotionH1 className="font-bold py-6 text-center">
            Turn Complex PDF's into simple Summaries - Instantly
          </MotionH1>
          <div className="flex justify-center">
            <MotionH2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
              Transform document into beautiful summaries
            </MotionH2>
          </div>
          <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
            <Button
              variant={"link"}
              className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8  py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline shadow-lg transition-all duration-300"
            >
              <Link href={"/#pricing"} className="flex gap-2 items-center">
                <span>Try SnapSummary</span>
                <ArrowRight className="animate-pulse" />
              </Link>
            </Button>
          </MotionDiv>
        </MotionDiv>
      </div>
    </MotionSection>
  );
};

export default HeroSection;
