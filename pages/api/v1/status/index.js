import database from "infra/database.js";
import { userAgentFromString } from "next/server";

//função para retornar o status da página
async function status(request, response) {
  //obtém a data dos dados apresentados na página convertida no formato ISO
  const updateAt = new Date().toISOString();

  //var para queries parametrizadas
  const datName = process.env.POSTGRES_DB;
  //const datName = request.query.datName;

  //invoca database.js para consulta ao DB
  const pgVersion = await database.query("SHOW server_version;");
  var maxConnections = await database.query("SHOW max_connections;");
  var usedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [datName],
  });

  //converte para tipo "number"
  maxConnections = Number(maxConnections.rows[0].max_connections);

  //retornar o status da página e informações do DB
  response.status(200).json({
    update_at: updateAt,
    database_info: {
      pg_version: pgVersion.rows[0].server_version,
      max_connections: maxConnections,
      used_connections: usedConnections.rows[0].count,
    },
  });
}

export default status;
