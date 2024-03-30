import type { FastifySchema } from "fastify";
import { Static, Type } from "@sinclair/typebox";

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

export type LoginCallbackQuerystring = Static<
  typeof loginCallbackQuerystringSchema
>;
