//// filepath: /app/pte/reading/page.tsx
"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import ReadingOptions from "./ReadingOptions";

const ReadingPage: React.FC = () => {
  return (
    <Authenticator>
      {() => (
        <div className="min-h-screen bg-gray-50 p-8">
          <ReadingOptions />
        </div>
      )}
    </Authenticator>
  );
};

export default ReadingPage;
