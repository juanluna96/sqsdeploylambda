import SQS from "aws-sdk/clients/sqs";
import {
  generateSQSQueueUrlFromArn,
  getOfflineSqsQueueUrl,
  isLocalHost,
} from "./utils/utils";

export const handler = async (event) => {
  let response;

  const body = JSON.parse(event.body);

  const sqsQueueUrl = generateSQSQueueUrlFromArn(
    process.env.QUEUE_ARN,
    body.queueName
  );

  const sqs = new SQS();
  const url = isLocalHost(event)
    ? getOfflineSqsQueueUrl(sqsQueueUrl)
    : sqsQueueUrl;

  if (!sqsQueueUrl) {
    return {
      statusCode: 404,
      body: "Queue not found",
    };
  }

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      Author: {
        DataType: "String",
        StringValue: "Preeti",
      },
    },
    MessageBody: "Welcome to CloudKatha",
    QueueUrl: url,
  };

  try {
    const data = await sqs.sendMessage(params).promise();

    if (data) {
      console.log("Success, message sent. MessageID:", data.MessageId);
      const bodyMessage =
        "Message Send to SQS- Here is MessageId: " + data.MessageId;
      response = {
        statusCode: 200,
        body: JSON.stringify(bodyMessage),
      };
    } else {
      response = {
        statusCode: 500,
        body: JSON.stringify("Some error occured !!"),
      };
    }
    return response;
  } catch (err) {
    console.log("Error", err);
  }
};
