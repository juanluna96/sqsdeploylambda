## Setup
First, you will need to install Node 16+ and Docker in your OS before starting.

Run this command to initialize a new project in a new working directory.

```
npm install
```

## Usage

**Start and Run the Project Offline**

Run the following commands in two cmd.

```
npm run dynamodb
```

```
npm dev
```

```
npm deploy
```

**Invoke the function**

Make a get request to the following endpoint `http://localhost:8080/`, with the following request:

```
{
    "queueName":"SecondQueue"
}
```
