import { NextRequest, NextResponse } from "next/server";

//Tools

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.split(".").length > 1) {
    return NextResponse.next();
  }

  //Checking isAuth
  let isAuth: boolean = false;
  const cafeAuthorization = await request.cookies.get("cafeAuthorization");
  if (cafeAuthorization) {
    const transformedData = await JSON.parse(cafeAuthorization.value);
    const token = transformedData.token;
    try {
      const res = await fetch(
        "https://berim-cafe-back-production.up.railway.app/v1/auth/check",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        isAuth = true;
      } else if (res.status === 401) {
        throw new Error(res.statusText);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        request.cookies.delete("cafeAuthorization");
      } else {
        console.log(err);
      }
      isAuth = false;
    }
  } else {
    isAuth = false;
  }

  if (request.nextUrl.pathname !== "/get-started") {
    if (isAuth) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${request.nextUrl.origin}/get-started`);
    }
  } else if (request.nextUrl.pathname === "/get-started") {
    if (isAuth) {
      return NextResponse.redirect(`${request.nextUrl.origin}/`);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/:path*"],
};
