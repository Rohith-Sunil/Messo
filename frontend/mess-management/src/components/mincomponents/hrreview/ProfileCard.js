import React, { useState } from "react";

function ReviewDialog({ isOpen, onClose, hrName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-2xl w-full bg-neutral-900 p-10 rounded-lg shadow-lg mb-28">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-3xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-white mb-6">Write a Review</h2>
        <p className="text-gray-400 mb-2">
          Review for:{" "}
          <span className="text-teal-500 font-semibold">{hrName}</span>
        </p>
        <p className="text-gray-400 mb-6">
          Let us know your feedback about the HR.
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="name@iiitm.ac.in"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-400">
              Your message
            </label>
            <textarea
              id="message"
              rows="10"
              className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProfileCard({ name, url }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHrName, setSelectedHrName] = useState("");

  const handleReviewClick = () => {
    setSelectedHrName(name);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="w-54 h-88 max-w-sm mx-auto bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-lg">
      <div className="border-b px-4 pb-6">
        <div className="text-center my-4">
          <img
            className="h-24 w-24 rounded-full border-4 border-white dark:border-neutral-800 mx-auto my-4 duration-200 hover:scale-105"
            src={url}
            alt="Img"
          />
          <div className="py-2">
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
              {name}
            </h3>
            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
              Hostel Representative
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-2">
          <button
            onClick={handleReviewClick}
            className="flex-1 rounded-full bg-teal-600 dark:bg-teal-800 text-white dark:text-white antialiased font-bold hover:bg-teal-800 dark:hover:bg-teal-900 px-4 py-2"
          >
            Review
          </button>
        </div>
      </div>
      <ReviewDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        hrName={selectedHrName}
      />
    </div>
  );
}
