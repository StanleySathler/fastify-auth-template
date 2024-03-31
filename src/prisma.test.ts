import { prismaClient } from "./prisma";

it("Should be able to run any queries in the database", async () => {
  await prismaClient.user.create({ data: {} });
  const users = await prismaClient.user.findMany();
  expect(users.length).toBeGreaterThanOrEqual(1);
});
