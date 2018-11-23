import { APIGatewayProxyResult } from 'aws-lambda';
import { World } from "cucumber";
 
declare module "cucumber" {
    interface World {
        error: Error;
        actual: APIGatewayProxyResult;
    }
}
