"use client";

import Questions from "./questions";
import { View, Heading } from "@aws-amplify/ui-react";

export default function PTEPage() {
  return (
    <View className="max-w-4xl mx-auto p-6">
      <Heading level={1} className="text-3xl font-bold mb-8">
        PTE Practice
      </Heading>
      <Questions />
    </View>
  );
}
