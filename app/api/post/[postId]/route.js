import client from "@/libs/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { postId } = params;

    const post = await client.post.findUnique({
      where: {
        id: postId,
      },

      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    });

    if (post) {
      return NextResponse.json(post, { status: 200 });
    } else {
      throw new Error("no post available");
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
