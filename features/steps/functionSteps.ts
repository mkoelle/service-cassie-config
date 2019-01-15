import { expect } from "chai";
import { Given, When, Then, After } from "cucumber";

const AWSMock = require('aws-sdk-mock');
import * as AWS from 'aws-sdk';
import * as sinon from 'sinon';
AWSMock.setSDKInstance(AWS);

import { APIGatewayEvent, Handler, Callback, Context, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { get } from '../../src/handler';

After(() => {
    // Clean up mocks after each scenario
    AWSMock.restore();
    sinon.restore();
});

Given('a cassie instance', function () {
    //No-op
    this.request = <APIGatewayEvent>{};
});

Given("a request path of {string}", function (path: string) {
    //set the path here
    this.request.path = path;
});

Given('the store has the content {string}', function (content: string) {

    let s3Stub = sinon.stub();
    s3Stub
        .yields(
            null, //no error
            {
                AcceptRanges: 'bytes',
                ContentType: 'text/plain',
                Metadata: {},
                Body: content
            }
        );
    AWSMock.mock('S3', 'getObject', s3Stub);

});

When("I get the value", async function () {
    let context: Context;

    let result = await get(this.request, context, null);

    this.actual = <APIGatewayProxyResult>result;
});

Then("the message is {string}", function (expected: string) {
    expect(JSON.parse(this.actual.body).message).to.equal(expected);
});

Then('the content is {string}', function (expected: string) {
    // Write code here that turns the phrase above into concrete actions
    let body = JSON.parse(this.actual.body);
    let actualcontent = JSON.stringify(body.content);
    expect(actualcontent).to.equal(expected);
});
