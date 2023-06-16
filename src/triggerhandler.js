import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "us-east-1" });

const generateSQSQueueUrlFromArn = (arn, queqe) => {
  if (!arn) return "";
  const [_, __, ___, region, accountId, queueName] = arn
    .replace("myQueue", queqe)
    .split(":");
  return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
};

export const handler = async (event) => {
  let response;

  const body = JSON.parse(event.body);

  const sqsQueueUrl = generateSQSQueueUrlFromArn(
    process.env.QUEUE_ARN,
    body.queueName
  );

  console.log(sqsQueueUrl);

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
    QueueUrl: sqsQueueUrl,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
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
