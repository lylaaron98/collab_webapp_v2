import { Save } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SaveButton = ({ loadingText }: { loadingText: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm ${false ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {pending ? (
        loadingText
      ) : (
        <>
          <Save className="mr-2 h-5 w-5" />
          Save Task
        </>
      )}
    </button>
  );
};

export default SaveButton;
