import React from "react";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^./.test(point);

  const emojiRegex = /[\u{1F300}-\u{1F9FF}] | [\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return {
    isNumbered,
    isMainPoint,
    hasEmoji,
    isEmpty,
  };
}

function parseEmoji(content: string) {
  const cleanContent = content.replace(/^[•]\s*/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);

  if (!matches) return null;

  const [_, emoji, text] = matches;

  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

interface Props {
  title: string;
  points: string[];
}

const ContentSection = ({ title, points }: Props) => {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { hasEmoji, isEmpty, isMainPoint, isNumbered } =
          parsePoint(point);

        if (isEmpty) return null;

        const { emoji, text } = parseEmoji(point);

        if (hasEmoji || isMainPoint) {
          return (
            <div
              key={`point-${index}`}
              className="group relative bg-linear-to-br 
          from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border
          border-gray-500/10 hover:shadow-lg transition-all"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-gray-500/10
            to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
              />
              <div className="relative flex items-start gap-3">
                <span className="text-lg lg:text-xl shrink-0 pt-1">
                  {emoji}
                </span>
                <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
                  {text}
                </p>
              </div>
              {/* </div> */}
            </div>
          );
        }

        return (
          <>
            <div
              key={`point-${index}`}
              className="group relative bg-linear-to-br 
          from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border
          border-gray-500/10 hover:shadow-lg transition-all"
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-gray-500/10
            to-transparent opacity-80 group-hover:opacity-100 transition-opacity rounded-2xl"
              />
              <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
                {point}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ContentSection;
