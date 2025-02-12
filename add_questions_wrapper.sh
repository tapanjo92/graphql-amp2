#!/bin/bash

# Check if environment variables are set
if [ -z "$AWS_REGION" ]; then
    echo "Error: AWS_REGION is not set"
    exit 1
fi

if [ -z "$AMPLIFY_DYNAMODB_TABLE" ]; then
    echo "Error: AMPLIFY_DYNAMODB_TABLE is not set"
    exit 1
fi

# Run the Node.js script
echo "Running add_questions.js with:"
echo "AWS_REGION=$AWS_REGION"
echo "AMPLIFY_DYNAMODB_TABLE=$AMPLIFY_DYNAMODB_TABLE"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing required npm packages..."
    npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @aws-sdk/client-sts
fi

# Run the script with full error output
# Add debug flags for more verbose output
export NODE_DEBUG=aws*
export AWS_SDK_DEBUG=true

echo "Running with debug flags enabled..."
node add_questions.js 2>&1 | tee questions_import.log
