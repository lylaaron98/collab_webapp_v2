"use server";

import Task from "@/models/Task";
import dbConnect from "../db";
import { revalidatePath } from "next/cache";

export interface Task {
  title: string;
  text: string;
  user: {
    firstName: string;
    clerkId: string;
  };
  completed: boolean;
}

export async function createTask(formData: FormData) {
  const taskData = {
    user: formData.get("username"),
    title: formData.get("title"),
    text: formData.get("text"),
  };

  try {
    // Connect to the database
    await dbConnect();

    const newTask = new Task(taskData);
    await newTask.save();

    // Return success response
    return { success: true };
  } catch (error) {
    console.error("Failed to create task", error);
    return {
      error: {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

export async function getTasks() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch the tasks from the MongoDB collection and populate the user field
    const tasks = await Task.find({}).populate("user", "firstName").lean(); // Populate user and select firstName and clerkId

    return tasks;
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    return []; // Return an empty array on error
  }
}

export async function getTaskById(id: string) {
  try {
    await dbConnect();
    const task = await Task.findById(id)
      .populate("user", "firstName clerkId")
      .lean(); // Populate the user field
    return task;
  } catch (error) {
    console.error("Failed to fetch task", error);
    return null; // Return null on error
  }
}

export async function updateTaskById(id: string, data: any) {
  try {
    await dbConnect(); // Connect to the database

    // Update the task status
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      data,
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return { message: "Task not found" };
    }
    revalidatePath(`/tasks/${id}`);
  } catch (error) {
    console.error("Failed to update task", error);
    return { message: "Failed to update task" };
  }
}

export async function getUserTasks(userId: string) {
  try {
    await dbConnect(); // Connect to the database

    // Fetch tasks for the specific user
    const tasks = await Task.find({ user: userId }).lean(); // Use .lean() for better performance

    return tasks; // Return the fetched tasks
  } catch (error) {
    console.error("Failed to fetch user tasks", error);
    return []; // Return an empty array on error
  }
}
