import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { isNullOrUndefined } from 'util';

export const get: APIGatewayProxyHandler = async (event, context) => {
  const path = event.path;
  let store = getStore();
  let filtered;

  if (!isNullOrUndefined(store) && !(path === "")) {
    filtered = (JSON.parse(store))[path]
  }else if (!isNullOrUndefined(store)) {
    filtered = JSON.parse(store)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `called with ${path}`,
      content:  filtered,
      input: event,
    }),
  };
}

function getStore() {
  let s3 = new AWS.S3(); var params = {
    Bucket: "configbucket",
    Key: "awesomeConfig.json"
  };
  let store;

  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response

    store = !isNullOrUndefined(data) ? data : "{}";
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
  return store;
}
