import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.get("https://your-mocked-url.com", () => {
    return HttpResponse.json({ mocked: true }, { status: 200 });
  }),

  http.post("https://oauth2.googleapis.com/token", () => {
    return HttpResponse.json({ mocked: true }, { status: 200 });
  }),

  http.get("https://www.googleapis.com/oauth2/v1/userinfo", () => {
    return HttpResponse.json({ mocked: true }, { status: 200 });
  })
);
