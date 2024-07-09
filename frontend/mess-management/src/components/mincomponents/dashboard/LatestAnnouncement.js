import React, { useState, useEffect } from "react";

const LatestAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/getAllAnnouncements"
        );
        const data = await response.json();

        // Sort announcements by date in ascending order
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Set the sorted announcements in state
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  // Slice to show only the last 3 announcements (most recent) and then reverse the order
  const lastThreeAnnouncements = announcements.slice(-3).reverse();

  // Function to truncate announcement content to fit within a fixed size
  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full overflow-auto">
      <h1 className="text-xl font-bold mb-4">Latest Announcements</h1>
      {lastThreeAnnouncements.map((announcement) => (
        <div
          key={announcement._id}
          className="mb-4 p-3 border rounded-lg shadow-sm"
        >
          <h2 className="text-base font-semibold mb-1">
            {announcement.subject}
          </h2>
          <p className="text-gray-700 mb-1">
            {truncateContent(announcement.announcement, 100)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LatestAnnouncement;
