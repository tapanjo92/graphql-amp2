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

// Extend input arguments with filtering and sorting options
type ListPTEQuestionsInput = {
  limit?: number;
  nextToken?: string;
  questionType?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  sortBy?: keyof PTEQuestion;
  sortOrder?: 'ASC' | 'DESC';
};

// Define the response type including pagination token
type ListPTEQuestionsResponse = {
  items: PTEQuestion[];
  nextToken: string | null;
};

export const handler: AppSyncResolverHandler<ListPTEQuestionsInput, ListPTEQuestionsResponse> = async (event) => {
  const dynamodb = new DynamoDB.DocumentClient();
  const tableName = process.env.PTEQUESTION_TABLE_NAME;
  if (!tableName) {
    throw new Error('PTEQUESTION_TABLE_NAME environment variable not set.');
  }

  // Build scan parameters
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
    Limit: event.arguments?.limit ?? 5,
    ExclusiveStartKey: event.arguments?.nextToken ? { id: event.arguments.nextToken } : undefined,
  };

  // Build dynamic filtering conditions if any
  const filterExpressions: string[] = [];
  const expressionAttributeValues: { [key: string]: any } = {};

  if (event.arguments?.questionType) {
    filterExpressions.push("questionType = :questionType");
    expressionAttributeValues[":questionType"] = event.arguments.questionType;
  }
  if (event.arguments?.difficulty) {
    filterExpressions.push("difficulty = :difficulty");
    expressionAttributeValues[":difficulty"] = event.arguments.difficulty;
  }
  if (filterExpressions.length > 0) {
    params.FilterExpression = filterExpressions.join(" AND ");
    params.ExpressionAttributeValues = expressionAttributeValues;
  }

  try {
    const result = await dynamodb.scan(params).promise();
    let items = (result.Items as PTEQuestion[]) || [];

    // In-memory sorting if requested
    if (event.arguments?.sortBy) {
      const sortKey = event.arguments.sortBy;
      const sortOrder = event.arguments.sortOrder === "DESC" ? -1 : 1;
      items.sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        // Handle possible undefined values
        if (aVal === undefined || bVal === undefined) return 0;
        if (aVal < bVal) return -1 * sortOrder;
        if (aVal > bVal) return 1 * sortOrder;
        return 0;
      });
    }

    // Determine nextToken from LastEvaluatedKey if exists
    const nextToken = result.LastEvaluatedKey ? result.LastEvaluatedKey.id : null;

    return { items, nextToken };
  } catch (error) {
    console.error('DynamoDB error:', error);
    throw new Error('Failed to fetch questions from DynamoDB');
  }
};

