import { APIGatewayProxyHandler } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { isNullOrUndefined } from 'util';
import { relative } from 'path';

export const get: APIGatewayProxyHandler = async (event, context) => {
  const path = event.path;
  let store = await getStore();
  let filtered;

  if (!isNullOrUndefined(store) && !(path === "")) {
    let paths = path.split('/') //BUG: this is a terrible idea
    filtered = getValueFromDepth(JSON.parse(store), paths)
  } else if (!isNullOrUndefined(store)) {
    filtered = JSON.parse(store)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `called with ${path}`,
      content: filtered,
      input: event,
    }),
  };
}

//BUG: I need to re-evaluate how paths will work
function getValueFromDepth(thing: any, paths: Array<string>) {
  if (paths.length > 0) {
    return getValueFromDepth(thing[paths.shift()], paths);
  }
  return thing
}

async function getStore() {
  let s3 = new AWS.S3();
  var params = {
    Bucket: "configbucket",
    Key: "awesomeConfig.json"
  };

  return await s3.getObject(params)
    .promise()
    .then((data) => {
      return data.Body ? String(data.Body.toString()) : ''
    })
    .catch((error) => {
      console.log(error);
      console.log(error.stack);
      throw error
    });
}
