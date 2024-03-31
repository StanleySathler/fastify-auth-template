import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";

import * as productController from "./controller";
import {
  loginCallbackEndpointSchema,
  loginCallbackQuerystringSchema,
} from "./schema";

export const authRouter = async (instance: FastifyInstance) => {
  instance.post(
    "/login/callback",
    {
      schema: loginCallbackEndpointSchema,
    },
    productController.loginCallback
  );
};
