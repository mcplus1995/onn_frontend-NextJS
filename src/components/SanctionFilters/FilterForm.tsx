"use client";

import { ButtonField, Field } from "../Form";
import {
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Filters, SanctionsContext } from "@/contexts/SanctionsContext";

import { SanctionMeta } from "@/types/SanctionsTypes";
import { aggregateMetaData } from "@/utils/sanctionUtils";
import clsx from "clsx";
import { debounce } from "@/utils/utils";
import { getSanctionMeta } from "@/utils/directus";
import { normalizeWithFixes } from "@/utils/stringFixes";
import { objToOptions } from "@/utils/generalUtils";
import styles from "./FilterForm.module.scss";
import { useFilters } from "@/hooks";

type FilterFormProps = HTMLAttributes<HTMLDivElement> & {};

type Option = { label: string; value: string };

const customSort = (a: Option, b: Option) => {
  const titleA = normalizeWithFixes(a.label, true);
  const titleB = normalizeWithFixes(b.label, true);

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
};

const sortAndFilterValues = <T,>(data: T[]) => {
  if (!data) return [];

  // TODO: Remove if * and None are properly handled
  const blacklist = ["*", "* (everything/unspecified)", "None"];

  console.log({ sortAndFilerData: data });

  // @ts-ignore - I can't even...
  const optionsData = objToOptions(data)
    .sort(customSort)
    .filter((item) => !blacklist.includes(item.label));
  return optionsData;
};

const FilterForm: FC<FilterFormProps> = ({
  className,
  ...other
}): JSX.Element => {
  const sanctionsContext = useContext(SanctionsContext);

  const [filters, _] = useFilters();
  const [sanctionMeta, setSanctionMeta] = useState<SanctionMeta>();

  const _setFilters = useCallback(
    debounce(
      (values: Filters) => sanctionsContext!.handleSetFilter!(values, true),
      300
    ),
    [sanctionsContext]
  );

  useEffect(() => {
    getSanctionMeta().then((data) => {
      const meta = aggregateMetaData(data!);
      if (!meta) return;
      setSanctionMeta(meta);
    });
  }, []);

  if (!sanctionsContext || !sanctionsContext.handleSetFilter || !sanctionMeta)
    return <></>;

  const sourcesOptions = sortAndFilterValues<string>(
    sanctionMeta["sanction_sources"]
  );

  const reasonsOptions = sortAndFilterValues<string>(
    sanctionMeta["sanction_reasons"]
  );

  const sectorsOptions = sortAndFilterValues<string>(
    sanctionMeta.sanction_sectors
  );

  const typesOptions = sortAndFilterValues<string>(
    sanctionMeta["sanction_types"]
  );

  return (
    <div className={clsx(styles.container, className)} {...other}>
      <Field
        name="search"
        label="Search"
        value={filters.get("search") || ""}
        onChange={_setFilters}
      />

      <ButtonField
        name="entity"
        label="Source"
        options={sourcesOptions}
        value={filters.get("entity") || ""}
        onChange={_setFilters}
        transformer={(source: string) => {
          return normalizeWithFixes(source, true);
        }}
      />

      <ButtonField
        name="reason"
        label="Reasons"
        options={reasonsOptions}
        value={filters.get("reason") || ""}
        onChange={_setFilters}
        transformer={(reason: string) => {
          return normalizeWithFixes(reason, true);
        }}
      />

      <ButtonField
        name="sector"
        label="Sector"
        options={sectorsOptions}
        value={filters.get("sector") || ""}
        onChange={_setFilters}
        transformer={(sector: string) => {
          return normalizeWithFixes(sector, true);
        }}
      />

      <ButtonField
        name="type"
        label="Type"
        options={typesOptions}
        value={filters.get("type") || ""}
        onChange={_setFilters}
        transformer={(type: string) => {
          return normalizeWithFixes(type, true);
        }}
      />
    </div>
  );
};

export default FilterForm;
