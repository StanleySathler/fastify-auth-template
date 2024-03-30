import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { GoogleUserDataResponse } from "../services/auth/google-strategy";

export const mockedGoogleUserData: GoogleUserDataResponse = {
  email: "test@example.com",
  id: "123",
  picture: "https://example.com/my-picture.jpg",
  verified_email: "true",
};

export const server = setupServer(
  http.get("https://your-mocked-url.com", () => {
    return HttpResponse.json({ mocked: true }, { status: 200 });
  }),

  http.post("https://oauth2.googleapis.com/token", () => {
    return HttpResponse.json(
      {
        access_token: "access_token",
        expires_in: 3799,
        refresh_token: "refresh_token",
        scope: "https://www.googleapis.com/auth/userinfo.profile",
        id_token: "id_token",
      },
      { status: 200 }
    );
  }),

  http.get("https://www.googleapis.com/oauth2/v1/userinfo", () => {
    return HttpResponse.json(mockedGoogleUserData, { status: 200 });
  })
);
