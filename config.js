module.exports = {
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    authKey: '',
    db: 'succeedstr'
  },
  express: {
     port: 3010
  },
  secret: process.env.BALTIO_SECRET || "3ntr0py!",
  publish : {
      endpoint : 'http://localhost:3000/api/publish/topic/todo'
  }
};
