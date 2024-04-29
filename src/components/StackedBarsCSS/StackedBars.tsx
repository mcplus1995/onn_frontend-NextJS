import { FC, HTMLAttributes } from "react";

import Bar from "./Bar";
import { GroupedEntityData } from "@/types/SanctionsTypes";
import chartColors from "@/components/ChartColors/ChartColors";
import clsx from "clsx";
import { getNormalizedTitle } from "@/utils/sanctionUtils";
import styles from "./StackedBars.module.scss";

type StackedBarsProps = HTMLAttributes<HTMLDivElement> & {
  data: GroupedEntityData;
  dataKey: "types" | "sectors" | "reasons";
};

const StackedBars: FC<StackedBarsProps> = ({
  className,
  data,
  dataKey,
  ...other
}): JSX.Element => {
  const subgroups = new Set<string>();
  Object.keys(data).forEach((source) => {
    const sourceData = data[source][dataKey];

    sourceData.forEach((item) => {
      subgroups.add(getNormalizedTitle(item[dataKey] as string));
    });
  });

  const sortedSubgroups: string[] = Array.from(subgroups).sort();
  const colorMap = sortedSubgroups.reduce(
    (map, subgroup, index) =>
      map.set(subgroup, chartColors[index % chartColors.length]),
    new Map()
  );

  return (
    <div className={clsx(styles.container, className)} {...other}>
      <figure className={styles.chartFigure}>
        <ul className={styles.legend}>
          {sortedSubgroups.map((subgroup) => {
            // TODO: Remove once * are handled correctly
            if (["*", "* (everything/unspecified)"].includes(subgroup)) return;

            return (
              <li
                key={`legend-item-${subgroup}`}
                style={
                  { "--bg": `${colorMap.get(subgroup)}` } as React.CSSProperties
                }
              >
                <span>{subgroup}</span>
              </li>
            );
          })}
        </ul>
      </figure>

      <div className={styles.graphic}>
        {Object.keys(data).map((source, i) => {
          const sourceData = data[source][dataKey].sort((a, b) =>
            (a[dataKey] as string).localeCompare(b[dataKey] as string)
          );

          return (
            <div className={styles.row} key={`row-${source}-${i}`}>
              <h6>{getNormalizedTitle(source)}</h6>
              <Bar
                segments={sourceData}
                dataKey={dataKey}
                colorMap={colorMap}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StackedBars;
