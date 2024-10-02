import { APIGatewayProxyResult } from 'aws-lambda';
import { LambdaError } from './index';

export const generateSuccessResponse = (data: unknown): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export const generateErrorResponse = (error: LambdaError): APIGatewayProxyResult => {
  return {
    statusCode: error.statusCode ?? 500,
    body: JSON.stringify({
      message: error.message ?? 'Internal Server Error',
    }),
  };
};
