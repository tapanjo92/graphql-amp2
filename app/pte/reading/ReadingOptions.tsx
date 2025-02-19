"use client";

import React from "react";
import Link from "next/link";
import { Card, Heading, Text, Flex, Button } from "@aws-amplify/ui-react";

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
    <Flex direction="column" gap="medium">
      {readingOptions.map((option, index) => (
        <Card key={index} padding="large" className="border border-gray-300 rounded-lg shadow-md">
          <Link href={option.url} passHref legacyBehavior>
            <Flex direction="column" gap="small" className="cursor-pointer">
              <Heading level={4} className="text-blue-800">
                {option.title}
              </Heading>
              <Text className="text-gray-700">{option.description}</Text>
            </Flex>
           </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default ReadingOptions;
