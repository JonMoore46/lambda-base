import { APIGatewayProxyResult } from "aws-lambda";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultHandler, LambdaEvent } from "../src/index";

describe("defaultHandler", () => {
  it("should return a success response with the correct message", async () => {
    const event: LambdaEvent = {
      body: JSON.stringify({ name: "John Doe" }),
    };

    const result: APIGatewayProxyResult = await defaultHandler(event);

    assert(result.statusCode === 200);
    assert(JSON.parse(result.body) === "John Doe says hello world!");
  });

  it("should return an error response when body is missing", async () => {
    const event: LambdaEvent = {
      body: "",
    };

    const result: APIGatewayProxyResult = await defaultHandler(event);

    assert(result.statusCode === 400);
    assert(JSON.parse(result.body).message === "Bad Request - Missing body");
  });

  it("should return an error response when name is missing", async () => {
    const event: LambdaEvent = {
      body: JSON.stringify({}),
    };

    const result: APIGatewayProxyResult = await defaultHandler(event);

    assert(result.statusCode === 400);
    assert(JSON.parse(result.body).message === "Bad Request - Missing name");
  });

  it("should handle JSON parsing errors", async () => {
    const event: LambdaEvent = {
      body: "invalid json",
    };

    const result: APIGatewayProxyResult = await defaultHandler(event);
    console.log(result);

    assert(result.statusCode === 500);
    assert(JSON.parse(result.body).message.includes("Unexpected token"));
  });
});
