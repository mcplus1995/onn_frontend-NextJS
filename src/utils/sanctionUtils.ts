import { GroupedEntityData, ReasonData, RegionData, SanctionMeta, SectorsData, TypeData } from "@/types/SanctionsTypes";
import {
    ItemsSanctionEntities,
    ItemsSanctionPurposes,
    ItemsSanctionSectors,
    ItemsSanctions,
    ItemsSanctionsSanctionPurposes,
    ItemsSanctionsSanctionSectors,
    ItemsSanctionsSanctionTypes
} from "@/robot/backendSchemas";
import stringFixes, { normalizeWithFixes } from "./stringFixes";

import { capitalizeFirstLetterOfEveryWord } from "./stringUtils";

// export interface SanctionsData {
//     data: ItemsSanctions[],
//     meta: XMetadata
// }

/**
 * Aggregates metadata data based on the given sanctions data.
 * 
 * @param sanctionsData The sanctions data to be aggregated.
 * @returns An object containing the aggregated chart data.
 */
export function aggregateMetaData(sanctionsData: ItemsSanctions[]): SanctionMeta | null {
    if (!sanctionsData) return null;
    // console.log({ data: sanctionsData.pop()})
    const typeCountMap = new Map();
    const reasonCountMap = new Map();
    const sectorCountMap = new Map();
    const entityCountMap = new Map();
    let totalCount = sanctionsData.length; // Use the total_count from the meta data

    sanctionsData.forEach((sanction) => {
        const { type, sector, purpose, entity } = sanction;

        (type as ItemsSanctionsSanctionTypes[]).forEach((typeItem) => {
            if (!typeItem) return;

            const title = (typeItem.sanction_types_id as ItemsSanctionPurposes).title;
            typeCountMap.set(title, (typeCountMap.get(title) || 0) + 1);
        });

        (sector as ItemsSanctionsSanctionSectors[]).forEach((sectorItem) => {
            if (!sectorItem) return;

            const title = (sectorItem.sanction_sectors_id as ItemsSanctionSectors).title;
            sectorCountMap.set(title, (sectorCountMap.get(title) || 0) + 1);
        });

        (purpose as ItemsSanctionsSanctionPurposes[]).forEach((purposeItem) => {
            if (!purposeItem) return;
            const title = (purposeItem.sanction_purposes_id as ItemsSanctionPurposes).title;
            reasonCountMap.set(title, (reasonCountMap.get(title) || 0) + 1);
        });

        const entityItem = (entity as ItemsSanctionEntities)
        if (!entityItem) return;
        const title = entityItem.title || "unknown";
        entityCountMap.set(title, (entityCountMap.get(title) || 0) + 1);
    });

    const types = Array.from(typeCountMap, ([types]) => types);
    const reasons = Array.from(reasonCountMap, ([reasons]) => reasons);
    const sectors = Array.from(sectorCountMap, ([sectors]) => sectors);
    const sources = Array.from(entityCountMap, ([sources]) => sources);

    return {
        sanction_types: types,
        sanction_reasons: reasons,
        sanction_sectors: sectors,
        sanction_sources: sources,
    };
}

/**
 * Aggregates chart data based on the given sanctions data.
 * 
 * @param sanctionsData The sanctions data to be aggregated.
 * @returns An object containing the aggregated chart data.
 */
export function aggregateChartData(sanctionsData: ItemsSanctions[]) {
    if (!sanctionsData) return null;
    // console.log({ data: sanctionsData.pop()})
    const typeCountMap = new Map();
    const reasonCountMap = new Map();
    const sectorCountMap = new Map();
    const entityCountMap = new Map();
    let totalCount = sanctionsData.length; // Use the total_count from the meta data

    sanctionsData.forEach((sanction) => {
        const { type, sector, purpose, entity } = sanction;

        (type as ItemsSanctionsSanctionTypes[]).forEach((typeItem) => {
            if (!typeItem) return;

            const title = (typeItem.sanction_types_id as ItemsSanctionPurposes).title;
            typeCountMap.set(title, (typeCountMap.get(title) || 0) + 1);
        });

        (sector as ItemsSanctionsSanctionSectors[]).forEach((sectorItem) => {
            if (!sectorItem) return;

            const title = (sectorItem.sanction_sectors_id as ItemsSanctionSectors).title;
            sectorCountMap.set(title, (sectorCountMap.get(title) || 0) + 1);
        });

        (purpose as ItemsSanctionsSanctionPurposes[]).forEach((purposeItem) => {
            if (!purposeItem) return;
            const title = (purposeItem.sanction_purposes_id as ItemsSanctionPurposes).title;
            reasonCountMap.set(title, (reasonCountMap.get(title) || 0) + 1);
        });

        const entityItem = (entity as ItemsSanctionEntities)
        if (!entityItem) return;
        const title = entityItem.title || "unknown";
        entityCountMap.set(title, (entityCountMap.get(title) || 0) + 1);
    });

    const types = Array.from(typeCountMap, ([types, count]) => ({ types, count }));
    const reasons = Array.from(reasonCountMap, ([reasons, count]) => ({ reasons, count }));
    const sectors = Array.from(sectorCountMap, ([sectors, count]) => ({ sectors, count }));
    const sources = Array.from(entityCountMap, ([sources, count]) => ({ sources, count }));

    return {
        total: totalCount,
        types,
        reasons,
        sectors,
        sources,
    };
}

/**
 * Aggregates chart data based on the given sanctions data, grouped by entity.
 * 
 * @param sanctionsData The sanctions data to be aggregated.
 * @returns An object containing the aggregated chart data grouped by entity.
 */
export function aggregateChartDataByEntity(sanctionsData: ItemsSanctions[]) {
    if (!sanctionsData) return null;

    // Initialize a map to hold the data for each entity.
    const entityDataMap = new Map();

    sanctionsData.forEach((sanction) => {
        const { type, sector, purpose, entity } = sanction;
        const entityTitle = (entity as ItemsSanctionEntities).title || 'Unknown';

        if (!entityDataMap.has(entityTitle)) {
            entityDataMap.set(entityTitle, {
                types: new Map(),
                reasons: new Map(),
                sectors: new Map(),
            });
        }

        const entityData = entityDataMap.get(entityTitle);

        (type as ItemsSanctionsSanctionTypes[]).forEach((typeItem) => {
            const title = (typeItem.sanction_types_id as ItemsSanctionPurposes).title || 'Unknown';
            entityData.types.set(title, (entityData.types.get(title) || 0) + 1);
        });

        (sector as ItemsSanctionsSanctionSectors[]).forEach((sectorItem) => {
            const title = (sectorItem.sanction_sectors_id as ItemsSanctionSectors).title || 'Unknown';
            entityData.sectors.set(title, (entityData.sectors.get(title) || 0) + 1);
        });

        (purpose as ItemsSanctionsSanctionPurposes[]).forEach((purposeItem) => {
            const title = (purposeItem.sanction_purposes_id as ItemsSanctionPurposes).title || 'Unknown';
            entityData.reasons.set(title, (entityData.reasons.get(title) || 0) + 1);
        });

    });

    const result: GroupedEntityData = {};
    entityDataMap.forEach((value, key) => {
        result[key] = {
            types: Array.from(value.types, ([types, count]) => ({ types, count })),
            reasons: Array.from(value.reasons, ([reasons, count]) => ({ reasons, count })),
            sectors: Array.from(value.sectors, ([sectors, count]) => ({ sectors, count })),
        };
    });

    return result;
}


// Type Guard for each typeexport 
export function isRegionDataArray(data: any[]): data is RegionData[] {
    return data.every(item => 'source' in item && 'count' in item);
}
export function isSectorsDataArray(data: any[]): data is SectorsData[] {
    return data.every(item => 'sectors' in item && 'count' in item);
}
export function isTypeDataArray(data: any[]): data is TypeData[] {
    return data.every(item => 'types' in item && 'count' in item);
}
export function isReasonDataArray(data: any[]): data is ReasonData[] {
    return data.every(item => 'reasons' in item && 'count' in item);
}

export const getNormalizedTitle = (raw: string) => {
    const capitalizedTitle = capitalizeFirstLetterOfEveryWord(raw);
    return stringFixes.has(capitalizedTitle)
        ? stringFixes.get(capitalizedTitle)!
        : capitalizedTitle;
};

export const mapToMeta = (input: string | string[], metaValues: string[]) => {
    const ret: string[] = [];
    if (!input || !metaValues) return "";
    if (Array.isArray(input)) {
        input.forEach((inputElem: string) => {
            // Ensure the inputElem is a valid key for metaValues array
            const metaValue = metaValues.find((mv) => mv === inputElem);
            if (metaValue) {
                ret.push(normalizeWithFixes(metaValue, true));
            }
        });
    } else {
        const metaValue = metaValues.find((mv) => mv === input);
        if (metaValue) {
            ret.push(normalizeWithFixes(metaValue, true));
        }
    }
    return ret.join(", ");
};