import database from "infra/database.js";
import { dropSchema } from "node-pg-migrate/dist/operations/schemas";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET para /api/v1/migrations deveria retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
