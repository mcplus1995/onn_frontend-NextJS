import { FC, HTMLAttributes } from "react";

import { ItemsSanctions } from "@/robot/backendSchemas";
import StackedBars from "../StackedBarsCSS/StackedBars";
import { aggregateChartDataByEntity } from "@/utils/sanctionUtils";
import clsx from "clsx";
import directus from "@/utils/directus";
import { readItems } from "@directus/sdk";
import styles from "./ChartArea.module.scss";

type ChartAreaProps = HTMLAttributes<HTMLDivElement> & {
  dataKey: "types" | "sectors" | "reasons";
};

async function getSanctionsData() {
  try {
    const sanctionsData = directus.request<ItemsSanctions[]>(
      readItems("sanctions", {
        fields: [
          "id",
          "type.sanction_types_id.title",
          "sector.sanction_sectors_id.title",
          "purpose.sanction_purposes_id.title",
          "entity.title",
        ],
        limit: -1,
      })
    );

    return sanctionsData;
  } catch (error) {
    console.error("Failed to fetch sanctions data: ", error);
    throw error;
  }
}

const ChartArea: FC<ChartAreaProps> = async ({
  dataKey,
  className,
  ...other
}) => {
  const sanctionsData = await getSanctionsData();
  // return <pre>{JSON.stringify(sanctionsData, null, 2)}</pre>;

  if (!sanctionsData) return <>No data found</>;

  const chartData = aggregateChartDataByEntity(sanctionsData);
  if (!chartData) return <>No chart data found</>;
  return (
    <div className={clsx(styles.container, className)} {...other}>
      <StackedBars data={chartData} dataKey={dataKey} />
    </div>
  );
};

export default ChartArea;
