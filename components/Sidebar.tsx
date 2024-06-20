import React, { useState, useMemo } from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";

const menuItems = [
  { id: 1, label: "Accueil", icon: HomeIcon, link: "/tutorials" },
  { id: 2, label: "Urgences en attente", icon: ArticleIcon, link: "/posts" },
  { id: 3, label: "Urgences traitées", icon: UsersIcon, link: "/users" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const pathname = usePathname();
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-blue-500 text-white flex justify-between flex-col",
    {
      "w-80": !toggleCollapse,
      "w-20": toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-blue-300 absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu:any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-blue-400 rounded w-full overflow-hidden whitespace-nowrap",
      {
        "bg-blue-400": activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <div className="bg-white rounded-full p-2">
              <LogoIcon className="w-30 h-30 text-white" /> {/* Ajustement de la taille du logo */}
            </div>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon className="text-white" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={menu.id}>
                <Link href={menu.link}>
                  <div className="flex py-4 px-3 items-center w-full h-full">
                    <div className="text-white" style={{ width: "2.5rem" }}>
                      <Icon className="text-white" />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div className="text-white" style={{ width: "2.5rem" }}>
          <LogoutIcon className="text-white" />
        </div>
        {!toggleCollapse && (
          <span onClick={handleLogout} className={classNames("text-md font-medium")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
