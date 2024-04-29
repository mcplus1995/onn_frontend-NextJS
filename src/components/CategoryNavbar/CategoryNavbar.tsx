"use client";

import { HTMLAttributes, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { FaBrain } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoMdNuclear } from "react-icons/io";
import { ItemsWikiCategory } from "@/robot/backendSchemas";
import Link from "next/link";
import { MdMilitaryTech } from "react-icons/md";
import { NavItem } from "@/types/KBTypes";
import { RiGovernmentLine } from "react-icons/ri";
import clsx from "clsx";
import styles from "./CategoryNavbar.module.scss";
import { useOnClickOutside } from "@/hooks/";

type PropsType = HTMLAttributes<HTMLDivElement> & {
  items: ItemsWikiCategory[];
};

const iconMap = new Map();
iconMap.set("political", RiGovernmentLine);
iconMap.set("nuclear", IoMdNuclear);
iconMap.set("military", MdMilitaryTech);
iconMap.set("osint", FaBrain);

const CategoryNavbar: React.FC<PropsType> = ({
  items,
  className,
  ...other
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const clickOutsideRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(clickOutsideRef, () => setSearchActive(false));

  const updatedItems: NavItem[] = items.map((item) => ({
    title: item.title || "No Title",
    description: item.description || "No Description",
    slug: item.slug || "no-slug",
    isActive: pathname.includes(`/knowledge-base/${item.slug}`),
  }));

  const handleSearchClick = () => {
    if (searchActive) {
      const searchTerm = searchRef.current?.value;
      if (searchTerm) {
        router.push(`/knowledge-base/search/${searchTerm}`);
      }
    } else {
      setSearchActive(true);
      searchRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div
      ref={clickOutsideRef}
      className={clsx(
        className,
        styles.categoryNavbar,
        searchActive && styles.searchActive
      )}
    >
      <div className={styles.categoriesContainer}>
        {updatedItems.map((item, index) => {
          const IconComponent = iconMap.get(item.slug);
          const linkClasses = clsx(
            styles["categoriesContainer__link"],
            item.isActive && styles["categoriesContainer__link--active"],
            "is-flex is-justify-content-center is-align-items-center is-clickable"
          );
          return (
            <Link
              key={index}
              href={`/knowledge-base/${item.slug}`}
              shallow={true}
            >
              <div className={linkClasses}>
                {IconComponent && <IconComponent className="icon" />}
                <span className={styles.itemTitle}>{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={clsx(styles.search, searchActive && styles.active)}>
        <div className={styles.searchIconContainer} onClick={handleSearchClick}>
          <FaSearch className="icon" />
        </div>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search Knowledge Base..."
          name="search"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default CategoryNavbar;
