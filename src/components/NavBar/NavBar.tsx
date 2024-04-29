"use client";

import { FC, HTMLAttributes, useState } from "react";
import { FixedItemsNavigations, SingleNavItem } from "@/utils/directus";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import React from "react";
import clsx from "clsx";
import { linkifyGeneric } from "@/utils/linkUtils";
import styles from "./NavBar.module.scss";
import { usePathname } from "next/navigation";

type NavBarProps = HTMLAttributes<HTMLDivElement> & {
  data: FixedItemsNavigations | null;
};

const NavBar: FC<NavBarProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const currentUrl = usePathname();

  const toggleSubmenu = (url: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [url]: !prev[url] }));
  };

  const renderLink = (route: SingleNavItem, isSubmenu: boolean = false) => {
    return (
      <React.Fragment key={isSubmenu ? route.url : null}>
        <Link
          href={route.url}
          className={clsx(
            "navbar-item",
            currentUrl === route.url && "is-active",
            styles.navItem,
            isSubmenu && styles.submenuItem,
            route.highlight && styles.navCTA
          )}
        >
          {route.highlight ? <span>{route.label}</span> : route.label}
        </Link>
        {route.submenu && route.submenu.length > 0 && (
          <div
            className={clsx(
              "navbar-submenu",
              styles.subMenu,
              openSubmenus[route.url] && styles.isActive
            )}
          >
            {route.submenu.map((subRoute) => renderLink(subRoute, true))}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <section className={clsx(styles.container)}>
      <nav
        id="primaryNavbar"
        className={clsx(styles.navbar)}
        role="navigation"
        aria-label="main navigation"
      >
        <div key={"brand"} className="navbar-brand">
          <a
            className="navbar-item"
            href={linkifyGeneric({ path: "/", target: "frontend" })}
          >
            <Image className={styles.logo} src={Logo} alt="Logo" />
          </a>

          <a
            role="button"
            className={clsx(
              "navbar-burger",
              isOpen && "is-active",
              styles.burgerContainer
            )}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="nav-menu"
          className={clsx(["navbar-menu", isOpen && "is-active"])}
        >
          <div className="navbar-end">
            {data &&
              data.items.map((route) => (
                <div
                  key={route.url}
                  className={styles.navItemContainer}
                  onPointerEnter={() => toggleSubmenu(route.url)}
                  onPointerLeave={() => toggleSubmenu(route.url)}
                >
                  {renderLink(route, false)}
                </div>
              ))}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
