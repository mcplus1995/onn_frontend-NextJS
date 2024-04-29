import { FC, PropsWithChildren } from "react";

import clsx from "clsx";
import styles from "./Infobox.module.scss";

type InfoboxProps = PropsWithChildren & {
  type: "warn" | "info";
};

const Infobox: FC<InfoboxProps> = (props): JSX.Element => {
  return (
    <div className={clsx(styles.infobox, styles[props.type], "mt-4")}>
      {props.children}
    </div>
  );
};

export default Infobox;
