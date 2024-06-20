import React from "react";

export default function ProfileCard({ name, url }) {
  // const num = Math.floor(Math.random() * 100 + 1);
  // const Url = `https://randomuser.me/api/portraits/men/${num}.jpg`;
  return (
    <div class="w-54 h-88 max-w-sm mx-auto bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-lg ">
      <div class="border-b px-4 pb-6">
        <div class="text-center my-4">
          <img
            class="h-24 w-24 rounded-full border-4 border-white dark:border-neutral-800 mx-auto my-4 duration-200 hover:scale-105"
            src={url}
            alt="Img"
          />
          <div class="py-2">
            <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {name}
            </h3>
            <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
              Hostel Representative
            </div>
          </div>
        </div>
        <div class="flex gap-2 px-2">
          <button class="flex-1 rounded-full bg-teal-600 dark:bg-teal-800 text-white dark:text-white antialiased font-bold hover:bg-teal-800 dark:hover:bg-teal-900 px-4 py-2">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}
