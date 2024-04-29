import { ReasonData, SectorsData, TypeData } from "@/types/SanctionsTypes";

import { normalizeWithFixes } from "@/utils/stringFixes";
import { FC } from "react";
import styles from "./Bar.module.scss";
import Segment from "./Segment";

const Bar: FC<{
  segments: ReasonData[] | SectorsData[] | TypeData[];
  dataKey: string;
  colorMap: Map<string, string>;
}> = ({ segments, dataKey, colorMap }) => {
  // TODO: Remove once * and "None" are handled correctly
  const blacklist = ["*", "* (everything/unspecified)"];
  const finalSegments = segments.filter(
    (segment) => !blacklist.includes(segment[dataKey] as string)
  );

  return (
    <div className={styles.chart}>
      {finalSegments.map((segment, index) => {
        const { count } = segment;
        const title = normalizeWithFixes(segment[dataKey] as string, true);
        const color = colorMap.get(title) || "black";

        return (
          <Segment
            key={`segment-${index}`}
            title={title}
            count={count}
            color={color}
          />
        );
      })}
    </div>
  );
};

export default Bar;
