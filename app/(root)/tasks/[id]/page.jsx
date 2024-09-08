"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getTaskById, updateTaskById } from "@/lib/actions/task"; // Create this function to fetch a single task
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook
import { FlattenMaps } from "mongoose";

const TaskDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the task ID from the URL
  const [task, setTask] = useState(null);
  const { user } = useUser(); // Get the logged-in user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        const fetchedTask = await getTaskById(id); // Fetch the task by ID
        setTask(fetchedTask);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const markAsDone = async () => {
    // Implement the logic to mark the task as done
    // You can call an API endpoint to update the task in the database
    // Example: await updateTaskStatus(id, { completed: true });

    await updateTaskById(id, { completed: true });
    console.log("Task marked as done");
  };

  if (loading) return <div>Loading...</div>; // Show loading state

  if (!task) return <div>Task not found.</div>; // Handle case where task is not found

  return (
    <div className="container mx-auto py-8 dark:text-light-900">
      <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-600 mb-4 dark:text-light-700">{task.text}</p>
      <p className="text-gray-500 mb-4 dark:text-light-700">
        Assigned to: {task.user?.firstName || "Unknown"}
      </p>
      <p className="text-sm text-gray-500 dark:text-light-700">
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      {user &&
        user.id === task.user?.clerkId &&
        !task.completed && ( // Check if the logged-in user is the task owner
          <button
            onClick={markAsDone}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Mark as Done
          </button>
        )}
    </div>
  );
};

export default TaskDetails;
