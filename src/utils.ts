import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { authRouter } from "./services/auth/router";

export const setupApp = () => {
  const fastify = Fastify({
    logger: true,
  });

  // Enable Typebox for schema definitions.
  fastify.withTypeProvider<TypeBoxTypeProvider>();

  // Add plugin for reading and setting cookies.
  fastify.register(fastifyCookie, {
    secret: "cookie-secret-signature",
  });

  /*
   * Router.
   */
  fastify.register(authRouter, { prefix: "auth" });

  return fastify;
};
