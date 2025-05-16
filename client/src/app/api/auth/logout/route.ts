import authApiRequest from "@/app/apiRequests/auth";
import { cookies } from "next/headers";
import { HttpError } from "@/lib/http"; // Adjust the path based on your project structure

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;

  if (force) {
    return Response.json(
      { message: "Force logout" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
        },
      }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  //  const refreshToken = res.refreshToken;
  if (!accessToken) {
    return Response.json(
      { message: "No access token provided" },
      { status: 401 }
    );
  }

  try {
    const result = await authApiRequest.logoutFromNextServer(accessToken);
    return Response.json(result.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status });
    } else {
      return Response.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
