import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="w-full bg-gray-100 shadow-lg dark:bg-black">
      <section className="relative mb-12">
        <div className="absolute inset-0 z-0 bg-black opacity-100">
          <Image
            src="/assets/images/landing/image2.jpg"
            alt="Chore Master Overview"
            width={1280}
            height={853}
            className="size-full object-cover opacity-40" // Set opacity here
          />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-32 sm:pb-24 sm:pt-40">
          <h1 className="mb-4 text-center text-4xl font-bold text-white sm:text-5xl">
            Welcome to <span className="whitespace-nowrap">Chore Master!</span>
          </h1>
          <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-3xl">
            Your Household, Organized
          </h1>
          <p className="mb-8 text-center text-lg text-white">
            ChoreMaster is your all-in-one solution for managing tasks, chores,
            and expenses within your family or household. Say goodbye to
            conflicts and chaos, and embrace a more organized and harmonious
            home life.
          </p>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <p className="inline-block rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700">
                Get Started
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-10 py-12 dark:bg-black">
        <h2 className="mb-8 text-center text-4xl font-bold text-dark-100 dark:text-light-900">
          Features
        </h2>

        {/* Feature 1 */}
        <div className="mb-8 flex items-start rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-stone-900">
          <div className="flex-1 pr-4 text-dark-100 dark:text-light-900">
            <h3 className="text-2xl font-bold ">Calendar Scheduler:</h3>
            <p className="text-lg leading-relaxed ">
              Keep track of important dates, events, and deadlines effortlessly.
            </p>
          </div>
          <Image
            src="/assets/images/landing/calendar.jpg"
            alt="Calendar Scheduler"
            width={400}
            height={300}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Feature 2 */}
        <div className="mb-8 flex items-start rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-stone-900">
          <div className="flex-1 pr-4 text-dark-100 dark:text-light-900">
            <h3 className="text-2xl font-bold">Live Chat:</h3>
            <p className="text-lg leading-relaxed">
              Stay connected with your family members through our real-time chat
              feature.
            </p>
          </div>
          <Image
            src="/assets/images/landing/chat.jpg"
            alt="Live Chat"
            width={400}
            height={300}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Feature 3 */}
        <div className="mb-8 flex items-start rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-stone-900">
          <div className="flex-1 pr-4 text-dark-100 dark:text-light-900">
            <h3 className="text-2xl font-bold">Points Reward System:</h3>
            <p className="text-lg leading-relaxed">
              Reward and motivate your household members with our credit system.
            </p>
          </div>
          <Image
            src="/assets/images/landing/reward.jpg"
            alt="Points Reward System"
            width={400}
            height={300}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Feature 4 */}
        <div className="mb-8 flex items-start rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-stone-900">
          <div className="flex-1 pr-4 text-dark-100 dark:text-light-900">
            <h3 className="text-2xl font-bold">Expense Graph:</h3>
            <p className="text-lg leading-relaxed ">
              Visualize your expenses and work towards your financial goals.
            </p>
          </div>
          <Image
            src="/assets/images/landing/expense.jpg"
            alt="Expense Graph"
            width={400}
            height={300}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      <section className="bg-gray-50 px-10 py-12 dark:bg-black">
        <h1 className="mb-8 text-center text-4xl font-bold text-dark-100 dark:text-light-900">
          Why Choose ChoreMaster
        </h1>

        {/* Family-Oriented Feature */}
        <div className="mb-8 flex items-start justify-start gap-6 rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-neutral-900">
          <Image
            src="/assets/images/landing/family.png"
            alt="Family-Oriented"
            width={200}
            height={200}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h3 className="text-2xl font-semibold text-dark-100 dark:text-light-900">
              Family-Oriented:
            </h3>
            <p className="text-lg leading-relaxed text-gray-700  dark:text-light-700">
              Designed with families in mind, ChoreMaster ensures everyone stays
              on the same page.
            </p>
          </div>
        </div>

        {/* User-Friendly Feature */}
        <div className="mb-8 flex items-start justify-start gap-6 rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-neutral-900">
          <Image
            src="/assets/images/landing/userFriendly.jpg"
            alt="User-Friendly"
            width={200}
            height={200}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h3 className="text-2xl font-semibold text-dark-100 dark:text-light-900">
              User-Friendly:
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-light-700">
              Our intuitive interface makes managing your household a breeze.
            </p>
          </div>
        </div>

        {/* Secure and Private Feature */}
        <div className="mb-8 flex items-start justify-start gap-6 rounded-lg bg-white p-6 shadow-lg dark:border dark:bg-neutral-900">
          <Image
            src="/assets/images/landing/secure.jpg"
            alt="Secure and Private"
            width={200}
            height={200}
            className="rounded-lg transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h3 className="text-2xl font-semibold text-dark-100 dark:text-light-900">
              Secure and Private:
            </h3>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-light-700">
              Your data is safe with us. We prioritize your privacy and
              security.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
