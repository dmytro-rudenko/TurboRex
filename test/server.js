const TurboRexServer = require('../server')
const rex = new TurboRexServer(3000);

rex.defineQueries([
  rex.add('msg', (data) => {
    const res = 'ababagalamaga: ' + data

    return res
  }),

  rex.add('plus', ({
    a,
    b
  }) => {
    return a + b
  })
])