"use server";

import User from "@/models/User";
import dbConnect from "@/lib/db";

export interface UserObj {
  _id?: string;
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
    const newUser = await User.create(user); // Await the user creation
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user"); // Optional: throw an error for better error handling
  }
}

export async function getUsers() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch the users from the MongoDB collection
    const users = await User.find({});
    return users; // Return the fetched users
  } catch (error) {
    console.error("Failed to fetch users", error);
    return []; // Return an empty array on error
  }
}
