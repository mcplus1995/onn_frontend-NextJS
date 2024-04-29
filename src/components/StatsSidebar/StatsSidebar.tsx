"use client";

import { FC, HTMLAttributes } from "react";
import { FaCircleNotch, FaGavel, FaLightbulb } from "react-icons/fa";

import IconText from "@/components/IconText/IconText";
import Link from "next/link";
import clsx from "clsx";
import styles from "./StatsSidebar.module.scss";
import { usePathname } from "next/navigation";

type SidebarItemProps = HTMLAttributes<HTMLAnchorElement> & {
  icon: JSX.Element;
  text: string;
  active?: boolean;
  link: string;
};

const StatsSidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  link,
  className,
  ...other
}): JSX.Element => {
  return (
    <Link
      href={link}
      className={clsx(className, styles.sidebarItem, active && styles.active)}
      {...other}
    >
      <IconText icon={icon} text={text} />
    </Link>
  );
};

type StatsSidebarProps = HTMLAttributes<HTMLDivElement> & {};

const StatsSidebar: FC<StatsSidebarProps> = ({
  className,
  ...other
}): JSX.Element => {
  const pathname = usePathname();

  const statIcons: Record<string, JSX.Element> = {
    types: <FaGavel />,
    sectors: <FaCircleNotch />,
    reasons: <FaLightbulb />,
  };

  const singularize = (plural: string) =>
    plural.charAt(0).toUpperCase() + plural.substring(1, plural.length - 1);

  return (
    <div className={clsx(styles.container, className)} {...other}>
      {Object.keys(statIcons).map((category, index) => {
        return (
          <StatsSidebarItem
            key={category}
            icon={statIcons[category]}
            text={singularize(category)}
            active={
              pathname.includes(category) ||
              (index === 0 && pathname.endsWith("/sanctions/stats"))
            }
            link={`/sanctions/stats/${category}`}
          />
        );
      })}
    </div>
  );
};

export default StatsSidebar;
