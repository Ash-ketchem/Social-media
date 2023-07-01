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

    const { id: userId } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });

    const { id } = await req.json();

    console.log(id, userId);

    if (!id || !userId) {
      throw new Error("invalid id");
    }

    const { likeIds } = await client.post.findUnique({
      where: {
        id: id,
      },
      select: {
        likeIds: true,
      },
    });

    if (!likeIds) {
      throw new Error("invalid post");
    }

    const updatedPost = await client.post.update({
      where: {
        id: id,
      },
      data: {
        likeIds: likeIds.includes(userId)
          ? likeIds.filter((id) => id !== userId)
          : [...likeIds, userId],
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
