import { FC, HTMLAttributes } from "react";

import clsx from "clsx";
import styles from "./LoadingComponent.module.scss";

type LoadingComponentProps = HTMLAttributes<HTMLDivElement> & {
  size: string;
};

const LoadingComponent: FC<LoadingComponentProps> = ({
  size = "30px",
  className,
  ...other
}): JSX.Element => {

  const loaderSize = {
    width: size,
    height: size
  }
  return (
    <div className={clsx(styles.container, className)} {...other}>
      <div className={styles.loader} style={loaderSize}></div>
    </div>
  );
};

export default LoadingComponent;
