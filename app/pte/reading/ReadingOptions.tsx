//// filepath: /app/pte/reading/ReadingOptions.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@aws-amplify/ui-react";

interface ReadingOption {
  title: string;
  description: string;
  url: string;
}

const readingOptions: ReadingOption[] = [
  {
    title: "Multiple-choice: choose single answer",
    description: "Select one answer from the options.",
    url: "/reading/mcq-s",
  },
  {
    title: "Multiple-choice: choose multiple answers",
    description: "Select one or more answers from the options.",
    url: "/reading/mcq-m",
  },
  {
    title: "Re-order paragraphs",
    description: "Arrange the paragraphs in the correct order.",
    url: "/reading/rop",
  },
  {
    title: "Fill in the blanks (drag and drop)",
    description: "Drag and drop to fill in the missing words.",
    url: "/reading/fitd",
  },
  {
    title: "Reading & Writing",
    description: "Engage in both reading and writing exercises.",
    url: "/reading/rw",
  },
];

const ReadingOptions: React.FC = () => {
  return (
    <section className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Reading Options</h1>
      {readingOptions.map((option, index) => (
        <Link key={index} href={option.url} passHref>
          <Button
            variation="primary"
            className="text-base font-medium p-4 text-center"
            aria-label={option.title}
          >
            <div className="flex flex-col">
              <span>{option.title}</span>
              <span className="text-sm font-normal text-gray-700">
                {option.description}
              </span>
            </div>
          </Button>
        </Link>
      ))}
    </section>
  );
};

export default ReadingOptions;

