import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../lib/consts/navigation";
import { MdFoodBank } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";
function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2x px-1 py-3 border-b border-neutral-700">
        <MdFoodBank fontSize={44} color="teal" />
        <span className="text-neutral-100 text-lg pt-3 size-10">Messo</span>
      </div>
      <div className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => {
          return <Sidebarlink key={item.key} item={item} />;
        })}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => {
          return <Sidebarlink key={item.key} item={item} />;
        })}
        <div className={classNames("text-red-500 cursor-pointer", linkClasses)}>
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function Sidebarlink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      className={classNames(
        pathname === item.path
          ? "text-white bg-neutral-700 "
          : "text-neutral-400 ",
        linkClasses
      )}
      to={item.path}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
}

export default Sidebar;
