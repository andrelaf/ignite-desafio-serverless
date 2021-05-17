import { document } from './../utils/dynamodbClient';
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid: user_id } = event.pathParameters;

  console.log("useriId", user_id);
  
  const response = await document.scan({
    TableName: "todos",
    FilterExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const todosExists = response.Items;

  console.log('todos', todosExists);
  
  if(todosExists){
    return {
      statusCode: 200,
      body: JSON.stringify(todosExists),
    }
  }

  return {
    statusCode: 404,
    body: JSON.stringify([])
  }

} 