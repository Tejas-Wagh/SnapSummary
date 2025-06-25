"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn, parseSection } from "@/lib/utils";
import ContentSection from "./ContentSection";

const SectionTitle = ({title}:{title:string})=>{
return <div className="flex flex-col gap-2 mb-6 sticky top-0 
pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
  <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
    {title}
  </h2>
</div>
}

const SummaryViewer = ({ summary }: { summary: string }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  return (
    <Card
      className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px]
    w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl
    border border-rose-500/10 "
    >
      <ProgressBar sections={sections} currentSection={currentSection}/>
      <div
        className="h-full overflow-y-auto scrollbar-hide pt-12
      sm:pt-16 pb-20 sm:pb-24"
      >
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""}/>
          <ContentSection title={sections[currentSection]?.title || ""} points = {sections[currentSection]?.points || []} />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
};

export default SummaryViewer;

const NavigationControls = ({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs
  border-t border-rose-500/10"
    >
      <div className="flex justify-between items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-r from-rose-500 to-rose-600  backdrop-blur-xs border border-rose-500/10",
            currentSection === 0 ? "opacity-50" : "hover:bg-rose-500/20"
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSection === index
                  ? "bg-linear-to-r from-rose-500 to-rose-600"
                  : "bg-rose-500/20 hover:bg-rose-500/30"
              )}
            />
          ))}
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-r from-rose-500 to-rose-600  backdrop-blur-xs border border-rose-500/10",
            currentSection === 0 ? "opacity-50" : "hover:bg-rose-500/20"
          )}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

interface ProgressBarProps {
  sections: Array<{ title: string; points: string[] }>;
  currentSection: number;
}

const ProgressBar = ({ sections, currentSection }: ProgressBarProps) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-20
  bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10"
    >
      <div className="px-4 flex gap-1.5">
        {sections.map((_, index) => (
          <div className="h-1.5 flex-1 rounded-full bg-rose-500/10 overflow-hidden">
            <div
              key={index}
              className={cn(
                "h-full bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-500",
                index === currentSection
                  ? "w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              )}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};
