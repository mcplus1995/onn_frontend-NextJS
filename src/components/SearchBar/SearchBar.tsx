"use client";

import { FC, HTMLAttributes, useRef } from "react";

import { FaSearch } from "react-icons/fa";
import clsx from "clsx";
import { linkifyGeneric } from "@/utils/linkUtils";
import styles from "./SearchBar.module.scss";
import { useRouter } from "next/navigation";

type SearchBarProps = HTMLAttributes<HTMLDivElement> & {
  targetUri: string;
  placeholder: string;
};

const SearchBar: FC<SearchBarProps> = ({
  className,
  targetUri,
  placeholder,
}): JSX.Element => {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    const searchTerm = searchRef.current?.value;
    router.push(
      linkifyGeneric({
        path: `${targetUri}?search=${searchTerm}`,
        target: "frontend",
      })
    );
  };

  const handleKeypress = (e: { code: string }) => {
    const keycode = e.code;
    if (keycode === "Enter") {
      handleSearchClick();
    }
  };
  return (
    <div className={clsx(styles.container, className, "is-hidden-mobile")}>
      <div className="field has-addons">
        <div className={clsx("control", styles.control)}>
          <input
            onKeyDown={handleKeypress}
            ref={searchRef}
            className={clsx("input", styles.input)}
            type="text"
            placeholder={placeholder}
          />
        </div>
        <div className="control">
          <a className={clsx("button", styles.button)} onClick={() => {}}>
            <FaSearch className="mr-3" />
            Search
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
