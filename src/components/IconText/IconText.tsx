"use client";

import { FC, HTMLAttributes, useRef, useState } from "react";

import clsx from "clsx";
import styles from "./IconText.module.scss";
import { useOnClickOutside } from "@/hooks/index";

type IconTextProps = HTMLAttributes<HTMLSpanElement> & {
  icon: JSX.Element;
  text?: string | JSX.Element;
  reversed?: boolean;
  narrow?: boolean;
  PopoverContent?: JSX.Element;
};

const IconText: FC<IconTextProps> = ({
  icon,
  text,
  reversed = false,
  className,
  narrow = false,
  PopoverContent: popoverContent,
  ...other
}) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  useOnClickOutside(ref, () => setPopoverOpen(false));

  return (
    <span
      ref={ref}
      className={clsx(
        styles.iconText,
        className,
        popoverContent &&
          "popover is-popover-bottom-tablet is-not-popover-hover",
        popoverContent && styles.popover,
        popoverOpen && styles.popoverActive,
        narrow && styles.narrow
      )}
      onClick={() => popoverContent && setPopoverOpen(!popoverOpen)}
      {...other}
    >
      {reversed ? (
        <>
          {text && <span>{text}</span>}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text && <span>{text}</span>}
        </>
      )}
      {popoverContent && popoverOpen && (
        <div className={clsx("popover-content")}>{popoverContent}</div>
      )}
    </span>
  );
};

export default IconText;
