test("GET para /api/v1/status deveria retornar 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedupdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedupdateAt);

  expect(typeof responseBody.database_info.pg_version).toBe("string");

  expect(typeof responseBody.database_info.max_connections).toBe("number");

  expect(typeof responseBody.database_info.used_connections).toBe("number");
});

/*test.only("teste SQL injection", async () => {
  //await fetch("http://localhost:3000/api/v1/status?datName=local_db");
  await fetch(
    "http://localhost:3000/api/v1/status?datName='; SELECT pg_sleep(4); --",
  );
});*/
