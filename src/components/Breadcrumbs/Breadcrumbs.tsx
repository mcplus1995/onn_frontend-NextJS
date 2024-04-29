import { FC, HTMLAttributes } from "react";

import Link from "next/link";
import clsx from "clsx";
import styles from "./Breadcrumbs.module.scss";

type BreadcrumbElement = {
  path: string;
  label: string;
};

type BreadcrumbsProps = HTMLAttributes<HTMLDivElement> & {
  last: BreadcrumbElement[];
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  className,
  last,
  ...other
}): JSX.Element => {
  return (
    <div
      className={clsx(styles.breadcrumbContainer, "section pt-0", className)}
      {...other}
    >
      <nav
        className={clsx(styles.breadcrumb, "breadcrumb")}
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="https://opennuclear.org/">ONN Home</a>
          </li>
          {/* <li>
            <a href={env.urls.cms}>ONN Korean Peninsula Analysis Centre</a>
          </li> */}
          {last &&
            last.map((el, index) => (
              <li
                key={`bc-${index}`}
                className={clsx(index === last.length - 1 && "is-active")}
              >
                <Link href={el.path} aria-current="page" shallow={true}>
                  {el.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
