import client from "@/libs/prismaClient";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { name, password, email } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("no valid session");
    }

    if (!name && !email && !password) {
      throw new Error("not all filels can be empty");
    }
    const {
      id: userId,
      name: oldName,
      email: oldMail,
      hashedPassword: oldPassword,
    } = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        hashedPassword: true,
      },
    });

    if (!userId) {
      throw new Error("invalid user");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await client.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name || oldName,
        hashedPassword: hashedPassword || oldPassword,
        email: email || oldMail,
      },
      select: {
        id: true,
      },
    });

    if (!updatedUser) {
      throw new Error("something went wrong");
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
};
