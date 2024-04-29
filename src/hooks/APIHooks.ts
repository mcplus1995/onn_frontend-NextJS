import { useReadItemsWikiCategory, useReadItemsWikiPage } from '@/robot/backendComponents';
import { useEffect, useState } from 'react';

export type EntityTypes = 'wikiCategory' | 'wikiPage';

interface FetcherInput {
    id?: number;
    slug?: string;
}

const useEntityFetcher = (type: EntityTypes, input: FetcherInput) => {
    const { id, slug } = input;

    // Hooks for fetching data
    const wikiCategoryQuery = useReadItemsWikiCategory({
        queryParams: {
            fields: id ? ["slug"] : ["id"],
            filter: [JSON.stringify({
                [id ? "id" : "slug"]: {
                    _eq: id || slug
                }
            })]
        }
    });

    const wikiPageQuery = useReadItemsWikiPage({
        queryParams: {
            fields: id ? ["slug"] : ["id"],
            filter: [JSON.stringify({
                [id ? "id" : "slug"]: {
                    _eq: id || slug
                }
            })]
        }
    });

    // Return the appropriate hook based on the type
    return type === 'wikiCategory' ? wikiCategoryQuery : wikiPageQuery;
};

export const useSlugToId = (type: EntityTypes, slug: string) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const { data, isLoading } = useEntityFetcher(type, { slug });

    useEffect(() => {
        if (data) {
            const results = data.data;
            if (results && results.length > 0) {
                setId(results[0].id || -1);
            } else {
                setId(undefined);
            }
        }
        setLoading(isLoading);
    }, [data, isLoading]);

    return { id, loading };
};

export const useIdToSlug = (type: EntityTypes, id: number) => {
    const [slug, setSlug] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const { data, isLoading } = useEntityFetcher(type, { id });

    useEffect(() => {
        if (data) {
            const results = data.data;
            if (results && results.length > 0) {
                setSlug(results[0].slug || 'no-slug');
            } else {
                setSlug(undefined);
            }
        }
        setLoading(isLoading);
    }, [data, isLoading]);

    return { slug, loading };
};