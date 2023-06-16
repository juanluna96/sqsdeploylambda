export const isLocalHost = (event) => {
  const isLocalHost = event.headers?.host?.includes("localhost");
  return isLocalHost ?? false;
};

export const generateSQSQueueUrlFromArn = (arn, queqe) => {
  if (!arn) return "";
  const [_, __, ___, region, accountId, queueName] = arn
    .replace("myQueue", queqe)
    .split(":");
  return `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`;
};

export const getOfflineSqsQueueUrl = (sqsQueueUrl) => {
  const url = new URL(sqsQueueUrl);
  return `${process.env.SQS_OFFLINE_ENDPOINT}${url.pathname}`;
};
