import React from "react";
import DashboardStatsgrid from "../mincomponents/dashboard/DashboardStatsgrid";
import PopularDays from "../mincomponents/dashboard/PopularFood";
import LatestAnnouncement from "../mincomponents/dashboard/LatestAnnouncement";
import MenuImage from "../mincomponents/dashboard/img/menubh3.png";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Today's Menu section */}
      <div className="bg-neutral-100 flex flex-col items-center justify-center">
        <div className="flex-1 overflow-hidden p-2 gap-4">
          <div className="bg-white shadow-md rounded-lg pb-4 px-3">
            <h2 className="text-xl font-bold py-2  text-center">
              Today's Menu
            </h2>
            <DashboardStatsgrid />
          </div>
          <div className="flex overflow-hidden p-2 gap-4">
            <div className="w-2/3 flex items-center justify-center mt-4 max-h-[29rem]">
              <div className="bg-white shadow-md rounded-lg h-full p-4 w-full">
                <h2 className="text-xl font-bold mb-4">Hostel Menu</h2>
                <img
                  src={MenuImage}
                  alt="Hostel Menu"
                  className="rounded-lg w-full h-auto max-h-96 object-contain"
                />
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-4 mt-4 max-h-[39rem]">
              <div className="bg-white shadow-md rounded-lg p-4 flex-none">
                <PopularDays />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 flex-1 overflow-y-auto max-h-[23rem]">
                <LatestAnnouncement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
