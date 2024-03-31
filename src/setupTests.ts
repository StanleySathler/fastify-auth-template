import { server } from "./mocks/server";
import { prismaClient } from "./prisma";

beforeAll(async () => {
  // Start msw server
  server.listen();

  // Connect Prisma - not really needed as it has a lazy connection anyway.
  prismaClient.$connect();
});

afterEach(async () => {
  // Reset msw handlers after every test.
  server.resetHandlers();
});

afterAll(async () => {
  // Close msw after all tests.
  server.close();

  // Disconnect Prisma - no reason to main it open if tests are now finished.
  prismaClient.$disconnect();
});
