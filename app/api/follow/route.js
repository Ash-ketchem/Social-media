import client from "@/libs/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("no session");
    }

    const { id: userId, followingIds } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        followingIds: true,
      },
    });

    const { followingId } = await req.json();

    // console.log(id, userId);

    if (!followingId || !userId || followingIds === null) {
      throw new Error("invalid id");
    }

    const updatedFollowingIds = followingIds.includes(followingId)
      ? followingIds.filter((id) => id !== followingId)
      : [...followingIds, followingId];

    const updatedUser = await client.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
