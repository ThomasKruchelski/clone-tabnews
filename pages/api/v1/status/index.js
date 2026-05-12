import database from "/infra/database.js";

async function status(request, response) {
  const getServerVersion = await database.query("SHOW server_version;");
  const serverVersion = getServerVersion.rows[0].server_version;
  // console.log(serverVersion);

  const getMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = getMaxConnections.rows[0].max_connections;
  // console.log(getMaxConnections.rows[0].max_connections);

  const getUsedConnections = await database.query(
    "SELECT pid, usename, client_addr, state, query FROM pg_stat_activity WHERE state != 'idle';"
  );
  const usedConnections = getUsedConnections.rows.length;
  // console.log(usedConnections);

  const updatedAt = new Date().toISOString();

  response.status(200).json({
    updated_at: updatedAt,
    server_version: serverVersion,
    max_connections: maxConnections,
    used_connections: usedConnections,
  });
}

export default status;
