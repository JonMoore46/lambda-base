import { APIGatewayProxyResult } from "aws-lambda";
import { generateErrorResponse, generateSuccessResponse } from "./utils";
export type LambdaEvent = {
  body: string;
};
export type LambdaBody = {
  name: string;
};
export type LambdaError = {
  statusCode?: number;
  message?: string;
};
console.log("ENV", process.env.ENV);
export const defaultHandler = async (event: LambdaEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Event", event);
    const { body } = event;
    const lambdaBody = <LambdaBody>validateAndReturnBody(body);
    const name = lambdaBody.name;
    console.log("Event", body);
    return generateSuccessResponse(`${name} says hello world!`);
  } catch (error) {
    const lambdaError: LambdaError = <LambdaError>error;
    console.error("Error in default handler", error);
    return generateErrorResponse(lambdaError);
  }
};


export const validateAndReturnBody = (body: string): LambdaBody | LambdaError => {
  if (!body) {
    console.error("No body in request");
    const error = new Error("Bad Request - Missing body");
    (error as LambdaError).statusCode = 400;
    throw error;
  }
  const lambdaBody: LambdaBody = typeof body === "object" ? body : JSON.parse(body);
  const name = lambdaBody.name;

  if (!name) {
    console.error("name property required in body");
    const error = new Error("Bad Request - Missing name");
    (error as LambdaError).statusCode = 400;
    throw error;
  }
  return lambdaBody;
};
