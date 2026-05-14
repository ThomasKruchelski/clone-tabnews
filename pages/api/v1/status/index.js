import database from "/infra/database.js";

async function status(request, response) {
  const getServerVersion = await database.query("SHOW server_version;");
  const serverVersion = getServerVersion.rows[0].server_version;
  // console.log(serverVersion);

  const getMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = getMaxConnections.rows[0].max_connections;
  // console.log(getMaxConnections.rows[0].max_connections);

  const databaseName = request.query.databaseName;
  console.log(`Banco de dados selecionado: ${databaseName}`);
  const getOpenedConnections = await database.query(
    `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`
    // "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';"
  );
  const openedConnections = getOpenedConnections.rows[0].count;
  // console.log(openedConnections);

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
