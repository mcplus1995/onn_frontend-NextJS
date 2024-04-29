export type Sanction = {
  short_description: string;
  detail: string;
  id: string;
  published_on: string;
  reasons: string[];
  ref: string;
  sectors: string[];
  source: string;
  source_url: string;
  types: string[];
  status: string;
};

export type SanctionStats = {
  [key: string]:
  | ReasonData[]
  | SectorsData[]
  | RegionData[]
  | TypeData[]
  | number;
  reasons: ReasonData[];
  sectors: SectorsData[];
  sources: RegionData[];
  types: TypeData[];
  total: number;
};

export interface BaseChartData {
  [key: string]: string | number;
  count: number;
}

export type RegionData = BaseChartData & {
  sources: string;
};

export type SectorsData = BaseChartData & {
  sectors: string;
};

export type TypeData = BaseChartData & {
  types: string;
};

export type ReasonData = BaseChartData & {
  reasons: string;
};

export type GroupedEntityData = {
  [k: string]: { types: TypeData[], reasons: ReasonData[], sectors: SectorsData[] }
}

type SanctionReasons = string[];
type SanctionSources = string[];
type SanctionSectors = string[];
type SanctionTypes = string[];


export type SanctionMeta = {
  sanction_reasons: SanctionReasons;
  sanction_sectors: SanctionSectors;
  sanction_sources: SanctionSources;
  sanction_types: SanctionTypes;
};

export type SanctionMetaKeys = keyof SanctionMeta;
