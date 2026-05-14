import database from "/infra/database.js";

async function status(request, response) {
  const getServerVersion = await database.query("SHOW server_version;");
  const serverVersion = getServerVersion.rows[0].server_version;
  // console.log(serverVersion);

  const getMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = getMaxConnections.rows[0].max_connections;
  // console.log(getMaxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;
  const getOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnections = getOpenedConnections.rows[0].count;

  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
