export async function POST(request: Request) {
  const res = await request.json();
  const accessToken = res.accessToken;
  //  const refreshToken = res.refreshToken;
  if (!accessToken) {
    return Response.json(
      { message: "No access token provided" },
      { status: 401 }
    );
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None`,
        //  "Set-Cookie": `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
      },
    }
  );
}
