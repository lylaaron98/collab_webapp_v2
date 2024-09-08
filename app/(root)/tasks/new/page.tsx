import Form from "./Form";

export default async function NewTask() {
  return (
    <div className="w-5/6 mx-auto bg-white p-6 rounded-lg shadow-md  dark:bg-neutral-900 dark:border">
      <h2 className="text-2xl font-bold mb-6 dark:text-light-900">
        Create a New Task
      </h2>

      <Form />
    </div>
  );
}
