import { FC } from "react";
import clsx from "clsx";
import styles from "./SanctionStatus.module.scss";

type SanctionStatusProps = {
  status: string | null | undefined;
  variant?: string;
};

const SanctionStatus: FC<SanctionStatusProps> = ({
  status,
  variant = "normal",
}): JSX.Element => {
  let mainPart = "";
  let addon = "";
  let className = "";

  if (!status || status === "" || typeof status !== "string") {
    mainPart = "-";
    className = "not-in-force";
  } else if (status.includes("In force")) {
    mainPart = "In Force";
    addon = status.replace("In force", "");
    className = "in-force";
  } else if (status.includes("No longer in force")) {
    mainPart = "Not in Force";
    addon = status.replace("No longer in force ", "");
    className = "not-in-force";
  } else {
    mainPart = status || "-";
    className = "not-in-force";
  }

  return (
    <span
      className={clsx(styles.container, styles[variant], styles[className])}
      // data-tooltip-id="sanctionstooltip"
      // data-tooltip-content={`Status`}
    >
      <span className={styles.statusMain}>{mainPart}</span>
      {addon && <span className={styles.statusAddon}>{addon}</span>}
    </span>
  );
};

export default SanctionStatus;
