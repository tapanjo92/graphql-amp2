#!/bin/bash

echo "🚀 Running DynamoDB Questions Import Script with Diagnostics"
echo "========================================================="

# Make scripts executable
chmod +x diagnose.sh
chmod +x add_questions_wrapper.sh

# First run diagnostics
echo -e "\n📋 Running Pre-flight Checks..."
./diagnose.sh
DIAG_RESULT=$?

if [ $DIAG_RESULT -ne 0 ]; then
    echo -e "\n❌ Pre-flight checks failed. Please fix the issues above before continuing."
    exit 1
fi

echo -e "\n✅ Pre-flight checks passed successfully!"
echo -e "\n🔄 Proceeding to add questions..."

# Run the actual script
./add_questions_wrapper.sh
