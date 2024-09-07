"use server";

import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function createUser(user) {
  try {
    await dbConnect();
    const newUser = User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
