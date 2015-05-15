module.exports = {
  title: 'Succeedstr',
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    authKey: '',
    db: 'succeedstr'
  },
  express: {
     port: 3010
  },
  secret: process.env.SUCCEEDSTR_SECRET || "3ntr0py!",
  publish : {
      endpoint : 'http://localhost:3000/api/publish/topic/todo'
  }
};
