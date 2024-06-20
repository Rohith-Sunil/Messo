import React from "react";

const announcements = [
  {
    id: 1,
    title: "New Menu Items!",
    content: "We have added new dishes to our menu. Come and check them out!",
    date: "2024-06-16",
  },
  {
    id: 2,
    title: "Maintenance Notice",
    content: "The dining hall will be closed for maintenance on June 20th.",
    date: "2024-06-15",
  },
  {
    id: 3,
    title: "Feedback Session",
    content:
      "Join us for a feedback session on June 18th to share your thoughts on the meal quality.",
    date: "2024-06-14",
  },
];

const Announcement = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Announcements</h1>
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="mb-6 p-4 border rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
            <p className="text-gray-700 mb-2">{announcement.content}</p>
            <p className="text-sm text-gray-500">
              Posted on: {announcement.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
