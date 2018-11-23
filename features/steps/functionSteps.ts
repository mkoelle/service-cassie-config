import { expect } from "chai";
import { Given, When, Then } from "cucumber";

import { APIGatewayEvent, Handler, Callback, Context } from 'aws-lambda';
import { get } from '../../src/handler';
 
Given('a cassie instance', function() {
    //No-op
});
 
When("I get the path {string}", function(path: string) {
    let apple = 1+3;
    let bridge = 4* apple;
    get(null, null, (error : Error, result : any) => {
        expect(error).to.be.null;
        this.actual = result;
        //this.error = error;
        result.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');    
      })
});
 
Then("the result is {string}", function(expected: string) {
    this.actual.body.should.equal('{"message":"Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!","input":null}');    
});
