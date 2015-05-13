module.exports = {
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    authKey: '',
    db: 'succeedstr'
  },
  express: {
     port: 3000
  },
  secret: process.env.BALTIO_SECRET || "3ntr0py!"
};
