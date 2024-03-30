import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import * as googleStrategy from "./google-strategy";
import { LoginCallbackQuerystring } from "./schema";

export const loginCallback = async (
  req: FastifyRequest<{ Querystring: LoginCallbackQuerystring }>,
  res: FastifyReply
) => {
  const code = req.query.code;

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Cannot find GOOGLE_CLIENT_ID env var");
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Cannot find GOOGLE_CLIENT_SECRET env var");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("Cannot find JWT_SECRET env var");
  }

  const { id_token, access_token } = await googleStrategy.exchangeCodeForTokens(
    {
      code,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: `http://localhost:8080`, // Must be the exact same value you've configured on Google Cloud Console
    }
  );

  const data = await googleStrategy.getUserData(access_token, id_token);
  const token = jwt.sign(data, process.env.JWT_SECRET);

  // Path - ensure token is set for the entire domain, not only to `/login/callback` calls.
  // HttpOnly - ensure token is not accessible from JavaScript to prevent XSS attacks.
  res.header("Set-Cookie", `token=${token}; Path=/; HttpOnly;`);

  res.send();
};
