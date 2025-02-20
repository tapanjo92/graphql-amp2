"use client";

import { Amplify } from 'aws-amplify';
import { generateClient } from '@aws-amplify/api';
import config from '../amplify_outputs.json';

// Configure Amplify for the application
Amplify.configure(config);

export const client = generateClient();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

