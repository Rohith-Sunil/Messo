// import React, { useState, useEffect } from "react";

// const PopularDays = () => {
//   const [topRatedDays, setTopRatedDays] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5000/api/v1/ratingByDayAndMealType"
//         );
//         const ratingsData = await response.json();
//         console.log("Fetched Ratings Data:", ratingsData);

//         // Set the data fetched
//         setTopRatedDays(ratingsData);
//       } catch (error) {
//         console.error("Error fetching ratings data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Sorting logic outside useEffect
//   const sortTopRatedDays = (data) => {
//     return data
//       .sort((a, b) => {
//         // Convert ratings to number if necessary
//         const ratingA = Number(a.rating) || 0;
//         const ratingB = Number(b.rating) || 0;

//         // Sort by rating in descending order
//         return ratingB - ratingA;
//       })
//       .slice(0, 3);
//   };
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
//       <h1 className="text-xl font-bold mb-4">Popular Days</h1>
//       {topRatedDays.length === 0 ? (
//         <p>Loading...</p>
//       ) : (
//         topRatedDays.map((day, index) => (
//           <div key={index} className="mb-4">
//             <p className="text-sm text-gray-600 mb-2">
//               <span className="font-bold text-black">{day._id.day}</span> -{" "}
//               {day._id.meal_type}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PopularDays;

import React, { useState, useEffect } from "react";

const PopularDays = () => {
  const [topRatedDays, setTopRatedDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/ratingByDayAndMealType"
        );
        const ratingsData = await response.json();
        console.log("Raw data from API:", ratingsData);

        const sortedTop3Days = sortTopRatedDays(ratingsData);
        console.log("Sorted top 3 days:", sortedTop3Days);

        if (!arraysEqual(sortedTop3Days, topRatedDays)) {
          console.log("Data changed, updating state");
          setTopRatedDays(sortedTop3Days);
        } else {
          console.log("Data unchanged");
        }
      } catch (error) {
        console.error("Error fetching ratings data:", error);
      }
    };
    fetchData();
  }, []);

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false;
    }
    return true;
  };

  const sortTopRatedDays = (data) => {
    return data
      .slice()
      .sort((a, b) => {
        const ratingA = Number(parseFloat(a.rating).toFixed(2));
        const ratingB = Number(parseFloat(b.rating).toFixed(2));
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        // If ratings are equal, sort by day name for consistency
        return a._id.day.localeCompare(b._id.day);
      })
      .slice(0, 3);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-4">Popular Days</h1>
      {topRatedDays.length === 0 ? (
        <p>Loading...</p>
      ) : (
        topRatedDays.map((day, index) => (
          <div key={index} className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-bold text-black">{day._id.day}</span> -{" "}
              {day._id.meal_type}
            </p>
            {/* <p className="text-sm text-gray-500">
              Average Rating: {Number(parseFloat(day.rating).toFixed(2))}
            </p> */}
          </div>
        ))
      )}
    </div>
  );
};

export default PopularDays;
