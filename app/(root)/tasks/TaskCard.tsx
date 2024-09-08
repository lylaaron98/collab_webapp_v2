"use client";
import { CheckCircle, XCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const TaskCard = ({ task }: { task: any }) => {
  const router = useRouter();
  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300  dark:bg-neutral-900 dark:border"
      onClick={() => router.push(`/tasks/${task._id}`)} // Handle click
    >
      <h2 className="text-xl font-bold mb-2 flex items-center text-dark-100 dark:text-light-900">
        {task.completed ? (
          <CheckCircle className="text-green-500 mr-2" />
        ) : (
          <XCircle className="text-red-500 mr-2" />
        )}
        {task.title}
      </h2>
      <p className="text-gray-600 mb-4  dark:text-light-700">{task.text}</p>
      <div className="flex items-center justify-between">
        <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
          {task.completed ? "Completed" : "Pending"}
        </span>
        <span className="text-gray-500 text-sm flex items-center dark:text-light-700">
          <User className="mr-1" />
          {task.user?.firstName || "Unknown"} {/* Access the firstName */}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
