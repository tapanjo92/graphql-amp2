#!/bin/bash

echo "🔧 DynamoDB Setup Diagnostic Tool"
echo "================================"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

# Check for required environment variables
echo -e "\n📝 Checking environment variables..."
[[ -z "${AWS_REGION}" ]] && echo "❌ AWS_REGION is not set" || echo "✅ AWS_REGION: $AWS_REGION"
[[ -z "${AMPLIFY_DYNAMODB_TABLE}" ]] && echo "❌ AMPLIFY_DYNAMODB_TABLE is not set" || echo "✅ AMPLIFY_DYNAMODB_TABLE: $AMPLIFY_DYNAMODB_TABLE"

# Check AWS credentials
echo -e "\n🔑 Checking AWS credentials..."
if aws sts get-caller-identity &> /dev/null; then
    echo "✅ AWS credentials are valid"
else
    echo "❌ AWS credentials are invalid or not set"
    exit 1
fi

# Install dependencies if needed
echo -e "\n📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing required npm packages..."
    npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb @aws-sdk/client-sts
fi

# Run Node.js diagnostic script
echo -e "\n🔍 Running detailed DynamoDB checks..."
node check_dynamodb_access.js
