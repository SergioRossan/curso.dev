import { up } from "infra/migrations/1769038327602_test-migration";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

//função para retornar o status da página
export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const defaultMigrationsOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: "true",
    migrationsTable: "pgmigrations",
  };

  if (request.method == "GET") {
    console.log("Entrou no GET");

    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);

    //retornar o status da página
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method == "POST") {
    console.log("Entrou no POST");

    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    //retornar o status da página
    return response.status(200).json(migratedMigrations);
  }

  //await dbClient.end();
  return response.status(405).end();
}
