const { TurboRexClient } = require("../index");

const main = async () => {
  const rex = new TurboRexClient("http://localhost", "3000");

  rex.defineCalls(["msg", "plus"]);

  const result = await rex.call("msg", "hello server");
  const r = await rex.call("plus", { a: 10, b: 15 });

  console.log("result:", result, r);
};

main();
