import React, { useState, useEffect } from "react";
import ProfileCard from "../mincomponents/hrreview/ProfileCard";

// Example of fetching HR reviews from backend
const fetchHRReviews = async (hrname) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/HR-Review?name=${encodeURIComponent(
        hrname
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching HR reviews:", error);
    return [];
  }
};

export default function HRreview() {
  const [selectedHRReviews, setSelectedHRReviews] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    // Check local storage for admin status on component mount
    const isAdminLocalStorage = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminLocalStorage === "true");
  }, []);

  // Dummy data for HRs (replace with actual data from API if needed)
  const hrData = [
    {
      name: "Suyash",
      url: "https://randomuser.me/api/portraits/men/1.jpg",
      hostelName: "BH-3",
    },
    {
      name: "Hari",
      url: "https://randomuser.me/api/portraits/men/7.jpg",
      hostelName: "BH-3",
    },
    {
      name: "Kavin",
      url: "https://randomuser.me/api/portraits/men/9.jpg",
      hostelName: "BH-3",
    },
    {
      name: "Varun",
      url: "https://randomuser.me/api/portraits/men/10.jpg",
      hostelName: "BH-3",
    },
    {
      name: "Rahul",
      url: "https://randomuser.me/api/portraits/men/18.jpg",
      hostelName: "BH-3",
    },
    {
      name: "Harsh",
      url: "https://randomuser.me/api/portraits/men/44.jpg",
      hostelName: "BH-3",
    },
  ];

  // Function to handle click on HR name and fetch their reviews
  const handleHRClick = async (hrName) => {
    try {
      const reviews = await fetchHRReviews(hrName);
      console.log(reviews);
      setSelectedHRReviews({ name: hrName, reviews });
    } catch (error) {
      console.error("Error fetching HR reviews:", error);
      setSelectedHRReviews(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="pb-8 mt-4">
        <p className="text-4xl font-bold underline decoration-gray-500 underline-offset-4 text-gray-900 px-2 m-2">
          Hostel Representatives Review
        </p>
        <div className="flex flex-row gap-5 m-4 p-10 bg-white shadow-md rounded-lg">
          {hrData.map((hr) => (
            <ProfileCard
              key={hr.name}
              name={hr.name}
              url={hr.url}
              hostelName={hr.hostelName}
              onClick={() => handleHRClick(hr.name)}
            />
          ))}
        </div>
      </div>

      {/* Admin Section - Conditionally rendered */}
      {isAdmin && (
        <div className="pb-8 mt-4">
          <p className="text-4xl font-bold underline decoration-gray-500 underline-offset-4 text-gray-900 px-2 m-2">
            Admin Section
          </p>
          <div className="grid grid-cols-3 gap-5 m-4 p-10 bg-white shadow-md rounded-lg">
            {hrData.map((hr) => (
              <button
                key={hr.name}
                onClick={() => handleHRClick(hr.name)}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 focus:outline-none"
              >
                {hr.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {selectedHRReviews && (
        <div className="pb-8 mt-4">
          <div className="flex flex-col gap-5 m-4 p-10 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold underline decoration-gray-500 underline-offset-4 text-gray-900 px-2 ">
                Reviews for:{" "}
                <span className="text-teal-600">{selectedHRReviews.name}</span>
              </p>
              <p className="text-gray-600">
                Total Reviews: {selectedHRReviews.reviews.length}
              </p>
            </div>
            {selectedHRReviews.reviews.length > 0 ? (
              <ul className="space-y-4">
                {selectedHRReviews.reviews.map((review, index) => (
                  <li
                    key={index}
                    className="border p-4 rounded-lg shadow-md bg-gray-50"
                  >
                    {index + 1}. {review.review}
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No reviews available for{" "}
                <span className="text-teal-600">{selectedHRReviews.name}</span>.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
