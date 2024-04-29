"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { debounce } from "@/utils/utils";
import styles from "./BackToTop.module.scss";
import { FaArrowUpFromBracket } from "react-icons/fa6";

const BackToTop = () => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleScroll = debounce(() => {
      const doc = document.documentElement;
      const top = window.scrollY - (doc.clientTop || 0);

      if (top > 100) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, 20);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={clsx(styles.container, isActive && styles.active)}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <FaArrowUpFromBracket className="icon" />
    </div>
  );
};

export default BackToTop;
