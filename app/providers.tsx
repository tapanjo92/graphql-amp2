"use client";

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplify_outputs.json';

Amplify.configure(config, { ssr: true });

export const client = generateClient();

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

