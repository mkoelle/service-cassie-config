import { APIGatewayProxyHandler } from 'aws-lambda';

export const get: APIGatewayProxyHandler = async (event, context) => {
  //const path = event.pathParameters.path;
  const path = ""
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `called with ${path}`,
      input: event,
    }),
  };
}
