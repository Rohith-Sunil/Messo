import React from "react";
import {
  MdOutlineFreeBreakfast,
  MdOutlineLunchDining,
  MdDinnerDining,
} from "react-icons/md";

export default function DashboardStatsgrid() {
  return (
    <div className="flex gap-4 w-full pt-1">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-600">
          <MdOutlineFreeBreakfast
            className="text-2xl text-white"
            fontSize={24}
          />
        </div>
        <div className="pl-4">
          <span className="text-sm text-grey-500 font-light">Breakfast</span>
          <div className="flex items-center">
            <strong className="text-xl text-grey-700 font-semibold">
              Dosa, Sambhar
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-600">
          <MdOutlineLunchDining className="text-2xl text-white" fontSize={24} />
        </div>
        <div className="pl-4">
          <span className="text-sm text-grey-500 font-light">Lunch</span>
          <div className="flex items-center">
            <strong className="text-xl text-grey-700 font-semibold">
              Mixed Veg, Arhar Dal
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-600">
          <MdDinnerDining className="text-2xl text-white" fontSize={24} />
        </div>
        <div className="pl-4">
          <span className="text-sm text-grey-500 font-light">Dinner</span>
          <div className="flex items-center">
            <strong className="text-xl text-grey-700 font-semibold">
              Aloo Paratha, Fried Rice
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
