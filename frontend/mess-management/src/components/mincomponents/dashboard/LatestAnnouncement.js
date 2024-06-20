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

export default function LatestAnnouncement() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-xl font-bold mb-4">Latest Announcements</h1>
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className="mb-4 p-3 border rounded-lg shadow-sm"
        >
          <h2 className="text-base font-semibold mb-1">{announcement.title}</h2>
          <p className="text-gray-700 mb-1">{announcement.content}</p>
          <p className="text-xs text-gray-500">
            Posted on: {announcement.date}
          </p>
        </div>
      ))}
    </div>
  );
}
