import { AppSyncResolverHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

// Define the shape of a single PTEQuestion (matches our GraphQL schema)
type PTEQuestion = {
    id: string;
    questionType: string;
    questionText: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    audioUrl?: string;
    imageUrl?: string;
    passageText?: string;
};

// Define input arguments (empty for now, but good for future expansion)
type ListPTEQuestionsInput = {
    limit?: number;
    nextToken?: string;
};

export const handler: AppSyncResolverHandler<ListPTEQuestionsInput, PTEQuestion[] | null> = async (event) => {
    const dynamodb = new DynamoDB.DocumentClient();
	const tableName = process.env.PTEQUESTION_TABLE_NAME;
    if (!tableName) {
        throw new Error('PTEQUESTION_TABLE_NAME environment variable not set.');
    }
    const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: tableName, // ! asserts this will be defined
        Limit: event.arguments?.limit ?? 5, // Use limit from input, default to 5
        ExclusiveStartKey: event.arguments?.nextToken ? { id: event.arguments.nextToken } : undefined,
    };

    try {
        const result = await dynamodb.scan(params).promise();
        return result.Items as PTEQuestion[] | null; // Cast to our defined type
    } catch (error) {
        console.error('DynamoDB error:', error);
        throw new Error('Failed to fetch questions from DynamoDB');
    }
};
