'use client';

import React from 'react';
import { Heading, Flex, Button, Authenticator } from '@aws-amplify/ui-react';
import ReadingOptions from './ReadingOptions';
import { redirect } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../../amplifyconfiguration.json';
import { signOut } from 'aws-amplify/auth';

Amplify.configure(config);
const client = generateClient();

export default function ReadingPage() {

    const handleLogout = async () => {
        try {
            await signOut();
            redirect("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <Flex direction="column" padding="large" gap="large" className="bg-gray-100 min-h-screen">
                   <Flex justifyContent="space-between" alignItems="center">
                        <Heading level={2} className="text-blue-600">PTE Reading</Heading>
                        <Button
                            variation="primary"
                            onClick={handleLogout}
                            aria-label="Logout"
                        >
                            Logout
                        </Button>
                    </Flex>
                    <ReadingOptions />
                </Flex>
            )}
        </Authenticator>
    );
}
