// check_dynamodb_access.js
const { DynamoDBClient, ListTablesCommand, DescribeTableCommand } = require("@aws-sdk/client-dynamodb");
const { STSClient, GetCallerIdentityCommand } = require("@aws-sdk/client-sts");

async function checkAwsSetup() {
    console.log('🔍 Starting AWS configuration diagnostics...\n');
    
    // Check environment variables
    console.log('1️⃣ Checking environment variables:');
    const region = process.env.AWS_REGION;
    const tableName = process.env.AMPLIFY_DYNAMODB_TABLE;
    
    if (!region) {
        console.error('❌ AWS_REGION is not set');
        return false;
    }
    console.log('✅ AWS_REGION:', region);
    
    if (!tableName) {
        console.error('❌ AMPLIFY_DYNAMODB_TABLE is not set');
        return false;
    }
    console.log('✅ AMPLIFY_DYNAMODB_TABLE:', tableName);
    
    try {
        // Check AWS credentials
        console.log('\n2️⃣ Verifying AWS credentials:');
        const stsClient = new STSClient({ region });
        const identity = await stsClient.send(new GetCallerIdentityCommand({}));
        console.log('✅ AWS credentials are valid');
        console.log('   Account:', identity.Account);
        console.log('   User:', identity.Arn);
        
        // Check DynamoDB access
        console.log('\n3️⃣ Checking DynamoDB access:');
        const dynamodb = new DynamoDBClient({ region });
        
        // List tables
        console.log('   Attempting to list DynamoDB tables...');
        const tables = await dynamodb.send(new ListTablesCommand({}));
        console.log('✅ Successfully connected to DynamoDB');
        console.log('   Available tables:', tables.TableNames.join(', '));
        
        // Check if our table exists
        if (!tables.TableNames.includes(tableName)) {
            console.error(`❌ Table "${tableName}" not found in region ${region}`);
            console.log('   Available tables:', tables.TableNames.join(', '));
            return false;
        }
        
        // Describe the table to verify permissions and structure
        console.log(`\n4️⃣ Checking table "${tableName}" details:`);
        const tableDetails = await dynamodb.send(new DescribeTableCommand({ TableName: tableName }));
        console.log('✅ Successfully retrieved table details');
        console.log('   Table Status:', tableDetails.Table.TableStatus);
        console.log('   Primary Key:', tableDetails.Table.KeySchema[0].AttributeName);
        
        // Validate table schema
        const primaryKey = tableDetails.Table.KeySchema[0].AttributeName;
        if (primaryKey !== 'id') {
            console.error(`❌ Table primary key must be 'id', found '${primaryKey}' instead`);
            return false;
        }
        
        // Check table status
        if (tableDetails.Table.TableStatus !== 'ACTIVE') {
            console.error(`❌ Table is not active (status: ${tableDetails.Table.TableStatus})`);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('\n❌ Error during diagnostics:', error.message);
        if (error.name === 'ExpiredTokenException') {
            console.log('\n💡 Tip: Your AWS credentials have expired. Try refreshing them.');
        } else if (error.name === 'UnauthorizedOperation') {
            console.log('\n💡 Tip: Your AWS user needs additional permissions.');
        }
        return false;
    }
}

// Run diagnostics if script is run directly
if (require.main === module) {
    checkAwsSetup()
        .then(success => {
            if (success) {
                console.log('\n✅ All checks passed successfully! You can now run add_questions.js');
                process.exit(0);
            } else {
                console.error('\n❌ Some checks failed. Please fix the issues above before running add_questions.js');
                process.exit(1);
            }
        })
        .catch(error => {
            console.error('\n❌ Diagnostic check failed:', error);
            process.exit(1);
        });
}

module.exports = { checkAwsSetup };
