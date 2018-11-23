import { expect } from "chai";
import { Given, When, Then } from "cucumber";

import { APIGatewayEvent, Handler, Callback, Context, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { get } from '../../src/handler';
import { AssertionError, doesNotThrow } from "assert";
 
Given('a cassie instance', function() {
    //No-op
    this.request = <APIGatewayEvent>{};
});
 
Given("a request path of {string}", async function(path: string) {
    //set the path here
    this.request.path = path;
});

When("I get the value", async function() {
    let context : Context;

    let result = await get(this.request, context, null);
 
    this.actual = <APIGatewayProxyResult>result;
});
 
Then("the message is {string}", function(expected: string) {
    expect(JSON.parse(this.actual.body).message).to.equal(expected);    
});
