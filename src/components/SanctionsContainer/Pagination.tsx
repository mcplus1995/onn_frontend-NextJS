"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { SanctionsContext } from "@/contexts/SanctionsContext";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  count: number;
  placement?: "top" | "bottom";
};

const Pagination: FC<PaginationProps> = ({ count, placement }) => {
  const pathname = usePathname();
  const query = useSearchParams();
  const sanctionContext = useContext(SanctionsContext);
  const currentPage = Number(sanctionContext!.getFilterValue!("page") || 1);
  const pageSize = Number(sanctionContext!.getFilterValue!("page_size") || 20);
  const maxPage = Math.ceil(count / pageSize);

  // Guard Page number
  const page =
    currentPage < 1 ? 1 : currentPage > maxPage ? maxPage : currentPage;

  const nextPageNumber = page < maxPage ? page + 1 : page;
  const previousPageNumber = page > 1 ? page - 1 : page;

  const queryParams = new URLSearchParams(query);

  // Set next and previous URLs
  queryParams.set("page", nextPageNumber.toString());
  const nextUrl = `${pathname}?${queryParams.toString()}`;
  queryParams.set("page", previousPageNumber.toString());
  const previousUrl = `${pathname}?${queryParams.toString()}`;

  return (
    <div className={clsx(styles.container, placement && styles[placement])}>
      <div className={styles.count}>
        {count === 0 ? "--" : count} items &middot;{" "}
        <select
          className={styles.pageSizeSelect}
          onChange={(e) =>
            sanctionContext!.handleSetFilter!(
              { page_size: e.target.value },
              true
            )
          }
          defaultValue={pageSize.toString()}
        >
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>{" "}
        per page
      </div>
      <div>
        {page > 1 && (
          <a
            className={styles.pageLink}
            onClick={(e) => {
              sanctionContext!.handleSetFilter!(
                { page: previousPageNumber.toString() },
                false
              );
              e.preventDefault();
            }}
            href={previousUrl}
          >
            &larr; prev &nbsp;
          </a>
        )}
        <span className={styles.pageNum}>
          Page {page} of {maxPage}
        </span>
        {page < maxPage && (
          <a
            className={styles.pageLink}
            onClick={(e) => {
              sanctionContext!.handleSetFilter!(
                { page: nextPageNumber.toString() },
                false
              );
              e.preventDefault();
            }}
            href={nextUrl}
          >
            &nbsp; next &rarr;
          </a>
        )}
      </div>
    </div>
  );
};

export default Pagination;
