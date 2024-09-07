"use server";

import User from "@/models/User";
import dbConnect from "@/lib/db";

interface UserObj {
  clerkId?: string;
  email: string;
  username?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: string;
}

export async function createUser(user: UserObj) {
  try {
    await dbConnect();
    const newUser = User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
