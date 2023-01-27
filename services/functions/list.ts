import { DynamoDB } from "aws-sdk";
import { Table } from "@serverless-stack/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler() {
  const params = {
    // Get the table name from the environment variable
    TableName: Table.Notes.tableName,
    // Get all the rows where the userId is our hardcoded user id
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };
  const results = await dynamoDb.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}