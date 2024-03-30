import type { FastifyInstance } from "fastify";
import { setupApp } from "../../utils";

let app: FastifyInstance;

beforeAll(() => {
  app = setupApp();
});

afterAll(async () => {
  await app.close();
});

describe("Login - Google", () => {
  it("Should, given no authorization code, respond 400", async () => {
    const response = await app.inject({
      method: "POST",
      url: "auth/login/callback",
    });

    expect(response.statusCode).toBe(400);
  });

  it("Should, given a valid authorization code from Google, set the token to the Cookies", async () => {
    const response = await app.inject({
      method: "POST",
      url: "auth/login/callback?code=valid-code",
    });

    expect(response.statusCode).toBe(200);
    // TODO: check if headers have been set
  });
});
