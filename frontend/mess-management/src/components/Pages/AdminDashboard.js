import React, { useState, useEffect } from "react";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner"];

export default function AdminDashboard() {
  const [ratings, setRatings] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch ratings data
        const ratingsResponse = await fetch(
          "http://localhost:5000/api/v1/ratingByDayAndMealType"
        );
        const ratingsData = await ratingsResponse.json();
        setRatings(ratingsData);

        // Fetch complaints data
        const complaintsResponse = await fetch(
          "http://localhost:5000/api/v1/getComplaints"
        );
        const complaintsData = await complaintsResponse.json();
        setComplaints(complaintsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Function to get the rating for a specific day and meal type
  const getRating = (day, mealType) => {
    const rating = ratings.find(
      (r) => r._id.day === day && r._id.meal_type === mealType
    );
    return rating ? rating.averageRating.toFixed(2) : "No data";
  };

  const handleSendAnnouncement = async () => {
    // Add logic to handle sending announcement
    console.log("Subject:", subject);
    console.log("Content:", content);

    try {
      let response = await fetch("http://localhost:5000/createAnnouncement", {
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
    <div className="bg-neutral-100 w-full text-black min-h-screen text-center md:text-left overflow-auto">
      <div className="max-w-screen-xl p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-2">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Admin Dashboard
          </p>
        </div>

        <div className="pb-8 mt-4">
          <h2 className="text-2xl font-semibold">Meal Ratings</h2>
          <div className="mt-4 overflow-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-2 px-4 border-b"></th>
                  {mealTypes.map((mealType, index) => (
                    <th key={index} className="py-2 px-4 border-b">
                      {mealType}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekdays.map((day, dayIndex) => (
                  <tr key={dayIndex} className="hover:bg-teal-100">
                    <td className="py-2 px-4 border-b font-bold">{day}</td>
                    {mealTypes.map((mealType, mealTypeIndex) => (
                      <td key={mealTypeIndex} className="py-2 px-4 border-b">
                        {getRating(day, mealType)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pb-8 mt-4">
          <h2 className="text-2xl font-semibold">Complaints & Suggestions</h2>
          <div className="mt-4">
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="mb-6 p-4 border rounded-lg shadow-md bg-white"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {complaint.subject}
                  </h2>
                  <p className="mb-2">{complaint.message}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> {complaint.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Message Type:</strong> {complaint.messageType}
                  </p>
                </div>
              ))
            ) : (
              <p>No complaints available.</p>
            )}
          </div>
        </div>

        {/* Send Announcement Button */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 focus:outline-none mb-4"
            onClick={() => setIsDialogOpen(true)}
          >
            Send Announcement
          </button>
        </div>

        {/* Announcement Dialog */}
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
                  className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}