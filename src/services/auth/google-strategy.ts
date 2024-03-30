export type GoogleTokenResponse = {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
};

export type GoogleUserDataResponse = {
  id: string;
  email: string;
  verified_email: string;
  picture: string;
};

export const exchangeCodeForTokens = async ({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<GoogleTokenResponse> => {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };

  // TODO: We can use SDK, a lib, or even a Fastify Plugin to
  // communicate to Google API. Much better than calling these endpoints
  // directly.
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(values).toString(),
  });
  if (!res.ok) {
    throw new Error(
      `Error while fetching tokens using Google provider. Code: ${
        res.status
      }. Message: ${await res.text()}`
    );
  }

  return (await res.json()) as GoogleTokenResponse;
};

export const getUserData = async (
  accessToken: string,
  idToken: string
): Promise<GoogleUserDataResponse> => {
  const res = await fetch(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Error while fetching user data from Google provider. Code: ${
        res.status
      }. Message: ${await res.text()}`
    );
  }

  return (await res.json()) as GoogleUserDataResponse;
};
