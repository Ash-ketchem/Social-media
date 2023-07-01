import client from "@/libs/prismaClient";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { name, email, username, password } = await req.json();

    if (!name || !email || !username | !password) {
      throw new Error("credentials cannot be empty");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // console.log(name, email, hashedPassword);

    const res = await client.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword,
      },
      select: {
        id: true,
      },
    });

    if (!res) {
      throw new Error("something went wrong");
    }
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
};
