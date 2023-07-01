import client from "@/libs/prismaClient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const len = searchParams.get("len");

  console.log(len);

  try {
    const session = await getServerSession(authOptions);

    console.log("session ", session);

    if (!session) {
      throw new Error("invalid session");
    }

    let selectObject = {
      id: true,
    };

    switch (len) {
      case "min":
        selectObject = {
          id: true,
          name: true,
          username: true,
          email: true,
        };
        break;
      case "med":
        selectObject = {
          id: true,
          name: true,
          username: true,
          email: true,
          bio: true,
          coverImage: true,
          profileImage: true,
          followingIds: true,
          hashNotification: true,
        };
        break;
    }

    const currentUser = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: selectObject,
    });

    if (!currentUser) {
      throw new Error("user doesn't exist");
    }

    return NextResponse.json({ user: currentUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
