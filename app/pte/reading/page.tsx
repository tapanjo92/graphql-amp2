"use client";

import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import ReadingOptions from "./ReadingOptions";

const ReadingPage: React.FC = () => {
  // Auth is handled by providers.tsx

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <ReadingOptions />
    </div>
  );
};

export default ReadingPage;
