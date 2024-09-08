"use client";
import React, { useRef } from "react";
import { createTask } from "@/lib/actions/task";
import SaveButton from "@/components/shared/SaveButton";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const SelectUser = dynamic(() => import("./SelectUser"), { ssr: false });

const Form = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={formRef}
        action={async (formData) => {
          formRef.current?.reset();

          const { error } = await createTask(formData);
          if (error) {
            alert(error.message);
          } else {
            router.push("/tasks");
          }
        }}
        className="space-y-6 "
      >
        {/* Task Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-light-900"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Task Text */}
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 dark:text-light-900"
          >
            Task Description
          </label>
          <textarea
            id="text"
            name="text"
            rows={4}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        {/* Assigned To */}

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-light-900"
          >
            Assign To
          </label>
          <SelectUser />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <SaveButton loadingText="saving..." />
        </div>
      </form>
    </>
  );
};

export default Form;
