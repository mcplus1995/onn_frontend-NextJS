"use client";

import { FC } from "react";
import { Tooltip } from "react-tooltip";
import styles from "./Segment.module.scss";

export type SegmentProps = {
  title: string;
  count: number;
  color: string;
};

const Segment: FC<SegmentProps> = ({ title, count, color }) => {
  const style = {
    backgroundColor: color,
    flexBasis: `${count}px`, // Or use a different calculation to fit your needs
  };

  return (
    <span
      title={`${title}: ${count}`}
      aria-label={title}
      className={styles.block}
      style={style}
      data-tooltip-id="sanctionstooltip"
      data-tooltip-content={`${title}: ${count}`}
      data-tip="HELLO WORLD"
    >
      <span className={styles.value}>{count}</span>
      <Tooltip id="sanctiontooltip" />
    </span>
  );
};

export default Segment;
