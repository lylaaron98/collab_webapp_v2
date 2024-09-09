"use client";
import { getUserTasks } from "@/lib/actions/task";
import { User, Mail, CheckCircle, XCircle, MessageCircle } from "lucide-react"; // Import additional icons
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { createChat, getChatByUserIds } from "@/lib/actions/chat";
import { getUserByClerkId } from "@/lib/actions/user.action";

const UserCard = ({ user }) => {
  const router = useRouter();
  const { user: loggedUser } = useUser();

  const [completedTasks, setCompletedTasks] = useState(0);
  const [assignedTasks, setAssignedTasks] = useState(0);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const tasks = await getUserTasks(user._id); // Fetch tasks for the specific user
      const userCompletedTasks = tasks.filter((task) => task.completed);
      setCompletedTasks(userCompletedTasks.length);
      setAssignedTasks(tasks.length); // Total tasks assigned to the user
    };

    fetchUserTasks();
  }, [user._id]);

  return (
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 dark:bg-neutral-900 dark:border"
      // onClick={() => router.push(`/users/${user._id}`)} // Handle click
    >
      <div className="flex items-center mb-2  dark:text-light-900">
        <User className="text-gray-500 mr-2" />
        <h2 className="text-xl font-bold ">
          {user.firstName} {user.lastName}
        </h2>
      </div>
      <div className="flex items-center mb-2  dark:text-light-900">
        <Mail className="text-gray-500 mr-2" />
        <p>{user.email}</p>
      </div>
      <div className="flex items-center mb-2  dark:text-light-900">
        <span className="flex items-center mr-4 ">
          {completedTasks > 0 ? (
            <CheckCircle className="text-green-500 mr-1" />
          ) : (
            <XCircle className="text-red-500 mr-1" />
          )}
          <span>{completedTasks} Completed Tasks</span>
        </span>
        <span className="flex items-center">
          <span className="text-gray-500 mr-1">
            {assignedTasks} Assigned Tasks
          </span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            user.active
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.active ? "Active" : "Inactive"}
        </span>

        {/* message */}
        {loggedUser?.id !== user?.clerkId && (
          <div
            className="flex border cursor-pointer p-2 rounded  hover:bg-light-800 hover:transition-colors"
            onClick={async () => {
              let loggedUser_ = await getUserByClerkId(loggedUser?.id);
              let chat = await getChatByUserIds([user._id, loggedUser_?._id]);

              if (chat) {
                router.push(`/chat/${chat?._id}`);
              } else {
                const { error, newChatId } = await createChat([
                  user._id,
                  loggedUser_?._id,
                ]);

                if (error) {
                  alert(error.message);
                } else {
                  router.push(`/chat/${newChatId}`);
                }
              }
            }}
          >
            <MessageCircle className="text-green-500 mr-1" />
            <span className="text-gray-500 mr-1">Message</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
