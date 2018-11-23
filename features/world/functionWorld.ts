import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { World } from "cucumber";
 
declare module "cucumber" {
    interface World {
        request: APIGatewayEvent;
        actual: APIGatewayProxyResult;
    }
}
