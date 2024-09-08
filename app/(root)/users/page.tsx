import { getUsers } from "@/lib/actions/user.action"; // Import the function to fetch users
import React from "react";
import UserCard from "./UserCard";

const Users = async () => {
  const users = await getUsers(); // Fetch the users

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      {users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
