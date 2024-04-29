"use client";

import { FC, PropsWithChildren, createContext, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ItemsSanctions } from "@/robot/backendSchemas";
import sanitizeHTML from "sanitize-html";

enum FilterEnum {
  reasons = "reasons",
  search = "search",
  source = "source",
  sectors = "sectors",
  types = "types",
  published_on_after = "published_on_after",
  published_on_before = "published_on_before",
  page = "page",
  page_size = "page_size",
}

export type Filters = Partial<{
  [k in FilterEnum as string]: string | number;
}>;

export interface SanctionsContextType {
  selectedStat: string | null;
  handleSetSelectedStat?: (stat: string) => void;
  selectedSanction: ItemsSanctions | null;
  handleSetSelectedSanction?: (sanction: ItemsSanctions | null) => void;
  filters: Filters;
  getFilterValue?: (key: string) => string | number | [];
  handleSetFilter?: (filters: Filters, resetPage: boolean) => void;
  wrapFilterTermsInText?: (
    text: string,
    tag?: string,
    searchString?: string
  ) => string;
}

export const SanctionsContext = createContext<SanctionsContextType | null>(
  null
);

export const SanctionsContextProvider: FC<
  PropsWithChildren<SanctionsContextType>
> = ({
  children,
  selectedSanction: initialSelectedSanction,
  selectedStat: initialSelectedStat,
  filters: initialFilters,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedSanction, setSelectedSanction] =
    useState<ItemsSanctions | null>(initialSelectedSanction);
  const [selectedStat, setSelectedStat] = useState<string>(
    initialSelectedStat || ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const queryParams = useSearchParams();

  const getFilterValue = (key: string): string | number => {
    return filters[key] || "";
  };

  const handleSetFilter = (f: Filters, resetPage: boolean) => {
    setFilters((old) => {
      let newFilters = {};

      if (resetPage) {
        newFilters = { ...old, ...f, page: 1 };
      } else {
        newFilters = { ...old, ...f };
      }

      // Eliminate empty values/null values/empty strings and empty objects from new filters
      newFilters = Object.entries(newFilters).reduce((acc, [key, value]) => {
        const isEmptyObject = (val: any) =>
          typeof val === "object" &&
          val !== null &&
          Object.keys(val).length === 0;
        if (value !== null && value !== "" && !isEmptyObject(value)) {
          // If value is an object (and supposed to be), serialize it; otherwise, just assign
          // @ts-ignore
          acc[key] = typeof value === "object" ? JSON.stringify(value) : value;
        }
        return acc;
      }, {});

      const newUrl = `${pathname}?${new URLSearchParams(
        newFilters
      ).toString()}`;
      // Replace the URL to reflect the new filter values
      router.replace(newUrl);

      return newFilters;
    });
  };

  const handleSetSelectedSanction = (sanction: ItemsSanctions | null) => {
    setSelectedSanction(sanction);
  };

  const handleSetSelectedStat = (stat: string) => {
    const newSearchParams = new URLSearchParams(queryParams);
    newSearchParams.set("selected_stat", stat);
    router.push(`${pathname}?${newSearchParams}`);
    setSelectedStat(stat);
  };

  const wrapFilterTermsInText = (
    text: string,
    tag?: string,
    searchString?: string
  ) => {
    if (!tag) tag = "mark";
    if (!filters.search && !searchString) return text;

    const search = searchString || filters.search;

    const re = new RegExp(`(${search})`, "gi");
    return sanitizeHTML(text.replace(re, `<${tag}>$1</${tag}>`));
  };

  return (
    <SanctionsContext.Provider
      value={{
        selectedStat,
        handleSetSelectedStat,
        selectedSanction,
        handleSetSelectedSanction,
        filters,
        getFilterValue,
        handleSetFilter,
        wrapFilterTermsInText,
      }}
    >
      {children}
    </SanctionsContext.Provider>
  );
};
