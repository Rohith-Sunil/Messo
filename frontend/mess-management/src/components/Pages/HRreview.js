import React from "react";
import ProfileCard from "../mincomponents/hrreview/ProfileCard";

export default function HRreview() {
  return (
    <div>
      <p className="text-4xl font-bold underline decoration-gray-500 underline-offset-4 text-gray-900 px-2 m-2">
        Hostel Representatives Review
      </p>
      <div className="flex flex-row gap-5 m-4 p-10 bg-white shadow-md rounded-lg">
        <ProfileCard
          name="Suyash"
          url="https://randomuser.me/api/portraits/men/1.jpg"
        />
        <ProfileCard
          name="Hari"
          url="https://randomuser.me/api/portraits/men/7.jpg"
        />
        <ProfileCard
          name="Kavin"
          url="https://randomuser.me/api/portraits/men/9.jpg"
        />
        <ProfileCard
          name="Varun"
          url="https://randomuser.me/api/portraits/men/10.jpg"
        />
        <ProfileCard
          name="Rahul"
          url="https://randomuser.me/api/portraits/men/18.jpg"
        />
        <ProfileCard
          name="Harsh"
          url="https://randomuser.me/api/portraits/men/44.jpg"
        />
      </div>
    </div>
  );
}
