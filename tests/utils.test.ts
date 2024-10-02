import { APIGatewayProxyResult } from 'aws-lambda';
import { generateSuccessResponse, generateErrorResponse } from '../src/utils';
import { LambdaError } from '../src/index';
import { it, describe } from 'node:test';
import assert from 'node:assert';
describe('Utils', () => {
  describe('generateSuccessResponse', () => {
    it('should return a valid APIGatewayProxyResult with status 200', () => {
      const data = { message: 'Success' };
      const result: APIGatewayProxyResult = generateSuccessResponse(data);

      assert(result.statusCode === 200);
      assert(result.body === JSON.stringify(data));
    });
    
    it('should handle empty data', () => {
      const result: APIGatewayProxyResult = generateSuccessResponse({});

      assert(result.statusCode === 200);
      assert(result.body === '{}');
    });
  });

  describe('generateErrorResponse', () => {
    it('should return a valid APIGatewayProxyResult with custom status code and message', () => {
      const error: LambdaError = {
        statusCode: 400,
        message: 'Bad Request',
      };
      const result: APIGatewayProxyResult = generateErrorResponse(error);

      assert(result.statusCode === 400);
      assert(result.body === JSON.stringify({ message: 'Bad Request' }));
    });

    it('should use default status code 500 when not provided', () => {
      const error: LambdaError = {
        message: 'Custom Error',
      };
      const result: APIGatewayProxyResult = generateErrorResponse(error);

      assert(result.statusCode === 500);
      assert(result.body === JSON.stringify({ message: 'Custom Error' }));
    });

    it('should use default message when not provided', () => {
      const error: LambdaError = {
        statusCode: 403,
      };
      const result: APIGatewayProxyResult = generateErrorResponse(error);

      assert(result.statusCode === 403);
      assert(result.body === JSON.stringify({ message: 'Internal Server Error' }));
    });
  });
});
