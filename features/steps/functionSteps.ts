import { expect } from "chai";
import { Given, When, Then } from "cucumber";

const AWSMock = require('aws-sdk-mock');
import * as AWS from 'aws-sdk';
AWSMock.setSDKInstance(AWS);

import { APIGatewayEvent, Handler, Callback, Context, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { get } from '../../src/handler';

Given('a cassie instance', function () {
    //No-op
    this.request = <APIGatewayEvent>{};
});

Given("a request path of {string}", function (path: string) {
    //set the path here
    this.request.path = path;
});

Given('the store has the content {string}', function (content: string) {
    // Write code here that turns the phrase above into concrete actions
    AWSMock.mock("S3", "getObject", content);

    //TODO: need to set the content of the object
    //TODO: ensure the expected bucket and file is requested
    //TODO: figure out why there is an AWS timeout when mocking
    /*
    data = {
     AcceptRanges: "bytes", 
     ContentLength: 3191, 
     ContentType: "image/jpeg", 
     ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
     LastModified: <Date Representation>, 
     Metadata: {
     }, 
     TagCount: 2, 
     VersionId: "null"
    }
    */
});

When("I get the value", async function () {
    let context: Context;

    let result = await get(this.request, context, null);

    this.actual = <APIGatewayProxyResult>result;
});

Then("the message is {string}", function (expected: string) {
    expect(JSON.parse(this.actual.body).message).to.equal(expected);
});

Then('the content is {string}', function (expected:string) {
    // Write code here that turns the phrase above into concrete actions
    let body = JSON.parse(this.actual.body);
    let actualcontent = JSON.stringify(body.content);
    expect(actualcontent).to.equal(expected);
});
