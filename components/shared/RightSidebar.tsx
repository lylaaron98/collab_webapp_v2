import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
const hotQuestions = [
  {
    _id: 1,
    title: "How to use React Hooks?",
  },
  {
    _id: 2,
    title: "What is the best way to manage state in React?",
  },
  {
    _id: 3,
    title: "How to implement authentication in a React app?",
  },
  {
    _id: 4,
    title: "How to use React Hooks?",
  },
  {
    _id: 5,
    title: "What is the best way to manage state in React?",
  },
  {
    _id: 6,
    title: "How to implement authentication in a React app?",
  },
];

const popularTags = [
  { _id: 1, name: "React", totalQuestions: 100 },
  { _id: 2, name: "Next.js", totalQuestions: 80 },
  { _id: 3, name: "TypeScript", totalQuestions: 70 },
  { _id: 4, name: "Tailwind CSS", totalQuestions: 60 },
  { _id: 5, name: "Node.js", totalQuestions: 50 },
  { _id: 6, name: "MongoDB", totalQuestions: 40 },
];
const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
