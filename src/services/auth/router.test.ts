import type { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { setupApp } from "../../utils";
import { mockedGoogleUserData } from "../../mocks/server";

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

    const token = jwt.sign(mockedGoogleUserData, process.env.JWT_SECRET ?? "");
    expect(response.statusCode).toBe(200);
    expect(response.cookies).toContainEqual(
      expect.objectContaining({
        name: "token",
        value: token,
        path: "/",
        httpOnly: true,
      })
    );
  });
});
