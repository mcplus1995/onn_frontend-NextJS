import { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import styles from "./BackendIcon.module.scss";

// TODO: This is pretty WIP - most of the icons wont work like that.
type BackendIconProps = HTMLAttributes<HTMLSpanElement> & {
  icon: string;
  size?: "normal" | "large" | "xlarge";
  iconStyle?: "filled" | "outlined" | "round" | "two-tone" | "sharp";
};

const BackendIcon: FC<BackendIconProps> = ({
  className,
  icon,
  iconStyle = "filled",
  size = "normal",
  ...other
}): JSX.Element => {
  return (
    <span
      className={clsx(
        `material-icons-${iconStyle}`,
        "material-icons",
        styles.container,
        styles[size],
        className
      )}
      {...other}
    >
      {icon}
    </span>
  );
};

export default BackendIcon;
