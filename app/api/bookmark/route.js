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

    if (!id || !userId) {
      throw new Error("invalid id");
    }

    const { bookmarked } = await client.post.findUnique({
      where: {
        id,
      },
      select: {
        bookmarked: true,
      },
    });

    const updatedPost = await client.post.update({
      where: {
        id: id,
      },
      data: {
        bookmarked: !bookmarked,
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

export async function GET(req) {
  const postsNum = 5;
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    if (!cursor || typeof cursor !== "string") {
      throw new Error("imvaid cursor value");
    }

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

    if (!userId) {
      throw new Error("invalid session");
    }

    const bookmarks = await client.post.findMany({
      where: {
        userId,
        bookmarked: true,
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
    return NextResponse.json(bookmarks, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
