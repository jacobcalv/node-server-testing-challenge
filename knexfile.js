const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  },
}

module.exports = {
  development: {
    ...sqlite,
    connection: {
      filename: "./database/orders.db3",
    },
  },
  test: {
    ...sqlite,
    connection: {
      filename: "./database/orders.db3",
    },
  },
}
