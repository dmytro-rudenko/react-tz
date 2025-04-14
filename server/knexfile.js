export default {
  development: {
    client: "pg",
    connection: {
      host: "host.docker.internal",
      user: "postgres",
      password: "00000000",
      database: "tz",
    },
    migrations: {
      directory: "./migrations",
    },
  },
};
