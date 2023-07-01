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

    const { postId, body } = await req.json();

    if (!body || !userId || !postId) {
      throw new Error("missing data");
    }

    const comment = await client.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });

    if (!comment) {
      throw new Error("failed to create a comment");
    }

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
