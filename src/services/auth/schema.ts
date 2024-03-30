import type { FastifySchema } from "fastify";
import { Type } from "@sinclair/typebox";

export const loginCallbackQuerystringSchema = Type.Object(
  {
    code: Type.String(),
  },
  { $id: "loginCallbackQuerystringSchema" }
);

export const loginCallbackEndpointSchema: FastifySchema = {
  querystring: loginCallbackQuerystringSchema,
  response: {},
};
