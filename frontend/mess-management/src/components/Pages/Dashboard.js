import React from "react";
import DashboardStatsgrid from "../mincomponents/DashboardStatsgrid";
import PopularFoods from "../mincomponents/dashboard/PopularFood";
import Latestannouncement from "../mincomponents/dashboard/LatestAnnouncement.js";

export default function Dashboard() {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-4xl font-bold underline decoration-gray-500 underline-offset-4 text-gray-900 px-2 m-2">
        Quick Review
      </p>
      <DashboardStatsgrid />
      <div className="flex gap-4 flex-row w-full m-4">
        <PopularFoods />
        <Latestannouncement />
      </div>
    </div>
  );
}
