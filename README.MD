# TurboRex

TurboRex is a lightweight library for creating real-time applications using Socket.IO on both the server and client side. It provides a simple API to define and handle queries with custom logic.

## Installation

To install TurboRex, clone the repository and install the necessary dependencies:

```bash
git clone <your-repo-url>
cd TurboRex
npm install
```

## Usage

### Server Side

Create a server using TurboRex by defining queries and their respective handlers.

#### Example:

```javascript
const TurboRexServer = require('./server'); // Adjust the path as needed
const rex = new TurboRexServer(3000);

rex.defineQueries([
  rex.add('msg', (data) => {
    const res = 'ababagalamaga: ' + data;
    return res;
  }),

  rex.add('plus', ({ a, b }) => {
    return a + b;
  })
]);
```

- **Server Initialization:**
  - Create a new instance of `TurboRexServer` by passing the port number.
  - Define queries using `defineQueries()`, which takes an array of query-handler pairs.
  - Use `rex.add()` to add a query and its handler function.

### Client Side

Create a client to interact with the server using TurboRex.

#### Example:

```javascript
const TurboRexClient = require('./client'); // Adjust the path as needed

const main = async () => {
  const rex = new TurboRexClient('http://localhost', '3000');

  rex.defineCalls(["msg", "plus"]);

  const result = await rex.call("msg", "hello server");
  const r = await rex.call("plus", { a: 10, b: 15 });

  console.log("result:", result, r);
};

main();
```

- **Client Initialization:**
  - Create a new instance of `TurboRexClient` by passing the host and port.
  - Use `defineCalls()` to listen for the server's responses for specific queries.
  - Use `call()` to send data to the server and receive a response. The method returns a promise that resolves after a specified wait time (default is 400ms).

## API Reference

### TurboRexServer

- `constructor(port: number)`
  - Initializes the server on the specified port.

- `defineQueries(list: Array<Object>)`
  - Defines a list of queries to handle client requests.
  - Each item in the list should be the result of `rex.add(query, handler)`.

- `add(query: string, handler: Function)`
  - Adds a query with a corresponding handler.
  - Returns an object with the query and a wrapped handler function that handles client requests and emits the response back to the client.

### TurboRexClient

- `constructor(host: string, port: string)`
  - Initializes the client and connects to the specified server.

- `defineCalls(list: Array<string>)`
  - Defines the queries the client will listen to for responses.

- `call(query: string, data: any, wait: number = 400)`
  - Sends a query to the server with the provided data.
  - Waits for the specified amount of time (in milliseconds) for a response.
  - Returns a promise that resolves with the response from the server.

## Example

### Server

```javascript
const TurboRexServer = require('./server');
const rex = new TurboRexServer(3000);

rex.defineQueries([
  rex.add('msg', (data) => {
    return 'Hello ' + data;
  }),

  rex.add('sum', ({ a, b }) => {
    return a + b;
  })
]);
```

### Client

```javascript
const TurboRexClient = require('./client');

const main = async () => {
  const rex = new TurboRexClient('http://localhost', '3000');

  rex.defineCalls(["msg", "sum"]);

  const result1 = await rex.call("msg", "TurboRex");
  const result2 = await rex.call("sum", { a: 5, b: 10 });

  console.log("Result 1:", result1);
  console.log("Result 2:", result2);
};

main();
```
