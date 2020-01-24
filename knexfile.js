const sqlite = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
}

module.exports = {
  development: {
    ...sqlite,
    connection: {
      filename: "./database/users.db3",
    },
  },
  test: {
    ...sqlite,
    connection: {
      filename: "./database/users.db3",
    },
  },
}