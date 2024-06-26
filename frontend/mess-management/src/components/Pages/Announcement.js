import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 relative">
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

const App = ({ isAdmin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSendAnnouncement = async () => {
    // Add logic to handle sending announcement
    console.log("Subject:", subject);
    console.log("Content:", content);

    try {
      let response = await fetch("http://localhost:5000//createAnnouncement", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Announcement />
      {isAdmin && (
        <div className="flex justify-center mt-4">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 focus:outline-none mb-4"
            onClick={() => setIsDialogOpen(true)}
          >
            Send Announcement
          </button>
        </div>
      )}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative max-w-2xl w-full bg-neutral-900 p-10 rounded-lg shadow-lg mb-28">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-3 right-3 text-white text-3xl font-bold focus:outline-none"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">
              Send Announcement
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAnnouncement();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-400">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Enter subject"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">Announcement</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  className="w-full mt-2 p-3 bg-gray-700 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter announcement"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
