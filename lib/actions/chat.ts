"use server";

import Chat from "@/models/Chat";
import dbConnect from "../db";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import User from "@/models/User";

export async function createChat(users: string[]) {
  try {
    // Connect to the database
    await dbConnect();

    // Create a new chat document
    const newChat = await Chat.create({
      users: users.map((userId) => new mongoose.Types.ObjectId(userId)),
    });

    // Return success response
    return { newChatId: newChat._id };
  } catch (error) {
    console.error("Failed to create Chat", error);
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

export async function getChatByUserIds(users: string[]) {
  try {
    await dbConnect();

    const chat = await Chat.find({
      users: {
        $all: users.map((userId) => new mongoose.Types.ObjectId(userId)),
      },
    })
      .populate("users", "firstName clerkId")
      .lean();

    return chat.length > 0 ? chat[0] : null;
  } catch (error) {
    console.error("Failed to fetch chat", error);
    return null;
  }
}

export async function getChatById(id: string) {
  try {
    await dbConnect(); // Connect to the database
    const chat = await Chat.findById(id)
      .populate("users", "_id firstName photo clerkId", User)
      .lean(); // Fetch the task by ID
    return chat ? chat : null; // This should return a single task or null
  } catch (error) {
    console.error("Failed to fetch chat", error);
    return null; // Return null on error
  }
}

export async function updateChatById(id: string, data: any) {
  try {
    await dbConnect(); // Connect to the database

    // Update the task status
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      data,
      { new: true } // Return the updated document
    );

    if (!updatedChat) {
      return { message: "chat not found" };
    }
    revalidatePath(`/chat/${id}`);
  } catch (error) {
    console.error("Failed to update task", error);
    return { message: "Failed to update task" };
  }
}

export async function deleteChatById(id: string) {
  try {
    await dbConnect(); // Connect to the database

    // Delete the task
    await Chat.findByIdAndDelete(id);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete chat", error);
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}
