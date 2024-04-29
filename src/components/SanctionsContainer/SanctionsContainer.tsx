"use client";

import {
  FC,
  HTMLAttributes,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSanctionMeta, getSanctions } from "@/utils/directus";

import Infobox from "../Infobox/Infobox";
import { ItemsSanctions } from "@/robot/backendSchemas";
import Pagination from "./Pagination";
import SanctionCard from "./SanctionCard";
import { SanctionMeta } from "../../types/SanctionsTypes";
import { SanctionsContext } from "@/contexts/SanctionsContext";
import { aggregateMetaData } from "@/utils/sanctionUtils";
import clsx from "clsx";
import styles from "./SanctionsContainer.module.scss";
import { useFilters } from "@/hooks";

type SanctionsContainerProps = HTMLAttributes<HTMLDivElement> & {};

const SanctionsContainer: FC<SanctionsContainerProps> = ({
  children,
  className,
  ...other
}) => {
  const [sanctions, setSanctions] = useState<ItemsSanctions[]>([]);
  const [sanctionMeta, setSanctionmeta] = useState<SanctionMeta>();
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filters, _] = useFilters();

  useEffect(() => {
    if (!filters) return;

    getSanctions({
      page: parseInt(filters.get("page") || "1"),
      limit: parseInt(filters.get("page_size") || "20"),
      filters: filters,
    }).then(({ data, total_count }) => {
      console.log({ total_count });
      setSanctions(data);

      // If nothing is being filtered or the only filters are page and page_size we set TotalCount to the total_count. otherwhise to data.length
      const filterKeys = Array.from(filters.keys());
      const hasOtherFilters = filterKeys.some(
        (key) => key !== "page" && key !== "page_size"
      );

      if (hasOtherFilters) {
        setTotalCount(data.length);
      } else {
        setTotalCount(total_count);
      }

      // if (data.length !== total_count) {
      //   setTotalCount(data.length);
      // } else {
      //   setTotalCount(total_count);
      // }
    });

    getSanctionMeta().then((data) => {
      const meta = aggregateMetaData(data!);
      if (!meta) return;
      setSanctionmeta(meta);
    });
  }, [filters]);

  const sanctionsContext = useContext(SanctionsContext);

  if (!sanctionsContext || !sanctionMeta) return <></>;

  return (
    <div
      className={clsx(
        styles.container,
        className,
        sanctionsContext.selectedSanction !== null && styles.readingPaneActive
      )}
      {...other}
    >
      <Suspense fallback={<></>}>
        <Pagination placement="top" count={totalCount} />
      </Suspense>
      <SanctionCard header={true} />

      {sanctions.length === 0 ? (
        <Infobox type="info">No results match your search criteria!</Infobox>
      ) : (
        sanctions.map((sanction) => {
          return (
            <SanctionCard
              key={sanction.id}
              sanction={sanction}
              meta={sanctionMeta}
            />
          );
        })
      )}
      <Suspense fallback={<></>}>
        <Pagination placement="bottom" count={totalCount} />
      </Suspense>
    </div>
  );
};

export default SanctionsContainer;
