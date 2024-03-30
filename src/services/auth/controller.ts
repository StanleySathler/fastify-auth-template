import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import * as googleStrategy from "./google-strategy";

export const loginCallback = async (req: FastifyRequest, res: FastifyReply) => {
  const code = (req.query as { code: string }).code; // TODO: remove casting

  console.log({ code });

  const { id_token, access_token } = await googleStrategy.exchangeCodeForTokens(
    {
      code,
      clientId: process.env.GOOGLE_CLIENT_ID ?? "", // TODO: do proper error handling
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "", // TODO: do proper error handling
      redirectUri: `http://localhost:8080`,
    }
  );

  const data = await googleStrategy.getUserData(access_token, id_token);
  const token = jwt.sign(data, process.env.JWT_SECRET ?? "default-magic"); // TODO: use env var

  // Set a cookie with the token.
  // - Path - ensure token is set for the entire domain, not only to `/login/callback` calls.
  // - HttpOnly - ensure token is not accessible from JavaScript to prevent XSS attacks.
  res.header("Set-Cookie", `token=${token}; Path=/; HttpOnly;`);

  res.send();
};
