"use strict";

export const handler = async (event) => {
  const message = "Third handler executed successfully!";

  console.log(message);
  console.log("event: " + JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
