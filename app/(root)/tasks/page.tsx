import { getTasks } from "@/lib/actions/task";
import React from "react";
import TaskCard from "./TaskCard";

const Tasks = async () => {
  const tasks = await getTasks();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
