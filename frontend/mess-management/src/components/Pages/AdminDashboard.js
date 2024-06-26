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
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const reviewsResponse = await fetch(
        //   "http://localhost:5000/api/v1/hrReviews"
        // );
        // const reviewsData = await reviewsResponse.json();
        // setReviews(reviewsData);

        const ratingsResponse = await fetch(
          "http://localhost:5000/api/v1/ratingByDayAndMealType"
        );
        const ratingsData = await ratingsResponse.json();
        setRatings(ratingsData);
        console.log(ratingsData);

        // const complaintsResponse = await fetch(
        //   "http://localhost:5000/api/v1/complaints"
        // );
        // const complaintsData = await complaintsResponse.json();
        // setComplaints(complaintsData);
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

  return (
    <div className="bg-neutral-100 w-full text-black min-h-screen text-center md:text-left overflow-auto">
      <div className="max-w-screen-xl p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="pb-8 mt-2">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Admin Dashboard
          </p>
        </div>

        <div className="pb-8 mt-4">
          <h2 className="text-2xl font-semibold">HR Reviews</h2>
          <div className="mt-4">
            {reviews.length > 0 ? (
              <table className="min-w-full bg-white dark:bg-neutral-900 shadow-md rounded-lg">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">HR Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-teal-100">
                      <td className="py-2 px-4 border-b">{review.hrName}</td>
                      <td className="py-2 px-4 border-b">{review.email}</td>
                      <td className="py-2 px-4 border-b">{review.review}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No HR reviews available.</p>
            )}
          </div>
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
          <h2 className="text-2xl font-semibold">Complaints</h2>
          <div className="mt-4">
            {complaints.length > 0 ? (
              <table className="min-w-full bg-white dark:bg-neutral-900 shadow-md rounded-lg">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="py-2 px-4 border-b">Student Name</th>
                    <th className="py-2 px-4 border-b">Email</th>
                    <th className="py-2 px-4 border-b">Complaint</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.id} className="hover:bg-teal-100">
                      <td className="py-2 px-4 border-b">
                        {complaint.studentName}
                      </td>
                      <td className="py-2 px-4 border-b">{complaint.email}</td>
                      <td className="py-2 px-4 border-b">
                        {complaint.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No complaints available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
