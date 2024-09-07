"use client";
import React from "react";
import CalendarWidget from "@/components/dashboard/CalenderWidget";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mx-auto mb-8 w-[95%] rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 dark:text-light-900">
        <p className="mb-2 text-lg font-medium">{today}</p>
        <h1 className="text-3xl font-bold">{user?.firstName}</h1>
      </div>
      <CalendarWidget />
    </div>
  );
};

export default Dashboard;
