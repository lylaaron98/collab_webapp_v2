import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const SelectUser = async () => {
  const users = await getUsers();

  const options = users?.map((user) => (
    <option key={user._id} value={user._id}>
      {user.firstName}
    </option>
  ));
  return (
    <select
      id="username"
      name="username"
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required
    >
      <option value="">Select User</option>
      {options}
    </select>
  );
};

export default SelectUser;
