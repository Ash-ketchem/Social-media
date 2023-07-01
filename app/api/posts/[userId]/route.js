import client from "@/libs/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    //paginated posts

    const postsNum = 5;

    const { userId } = params;

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    console.log("user id", userId, " cursor ", cursor);

    if (!cursor || typeof cursor !== "string") {
      throw new Error("invaid cursor value");
    }

    if (!userId || typeof userId !== "string") {
      throw new Error("invaid userId");
    }

    const posts = await client.post.findMany({
      where: {
        userId: userId,
      },
      take: -postsNum,
      skip: 1, // Skip the cursor
      cursor: {
        id: cursor,
      },
      select: {
        id: true,
        body: true,
        images: true,
        likeIds: true,
        createdAt: true,
        bookmarked: true,
        _count: {
          select: { comments: true },
        },
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (posts.length) {
      return NextResponse.json(posts, { status: 200 });
    } else {
      return NextResponse.json(posts, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
