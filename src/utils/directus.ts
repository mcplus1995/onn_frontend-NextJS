import { ItemsCMSPage, ItemsGlobal, ItemsHomepage, ItemsNavigations, ItemsSanctions, ItemsWikiPage } from '@/robot/backendSchemas';
import { aggregate, authentication, createDirectus, readItem, readItems, rest } from '@directus/sdk';

import env from '@/env';
import { ReadonlyURLSearchParams } from 'next/navigation';
import pluralizeLibrary from 'pluralize';
import { linkifyCMSPage } from './linkUtils';
import { stringToSlug } from './stringUtils';

export const directus = createDirectus(env.urls.backend).with(rest());

const authenticatedUrl = new URL('/', env.urls.backend);
authenticatedUrl.searchParams.set('access_token', process.env.DIRECTUS_ADMIN_TOKEN || '');
// console.log({ fullAuthUrl: authenticatedUrl.toString() });

export const adminDirectus = createDirectus(authenticatedUrl.toString()).with(rest()).with(authentication());

export const getGlobals = async () => {
    await avoidRateLimit()

    return directus.request<ItemsGlobal>(readItems('global'));
}

export type SingleNavItem = {
    label: string,
    url: string,
    existing_page?: {
        key: number,
        collection: string
    }
    submenu?: SingleNavItem[]
    highlight?: boolean
}

// This exists because the schema codegen didn't pick up the fact that the items field is an array of objects.
export type FixedItemsNavigations = ItemsNavigations & {
    items: SingleNavItem[]
}

export const getNavigation = async (title: string) => {
    await avoidRateLimit()

    const results = await directus.request<FixedItemsNavigations[]>(readItems('navigations', {
        fields: ['*.*'],
        limit: 1
    }));

    if (!results) return null;

    for (let i = 0; i < results[0].items.length; i++) {
        const existingPage = results[0].items[i].existing_page
        if (existingPage) {

            const pageData = await directus.request<ItemsCMSPage>(readItem('cms_page', String(existingPage.key)))
            if (pageData.nav_title) results[0].items[i].label = pageData.nav_title;
            results[0].items[i].url = linkifyCMSPage(pageData.slug || stringToSlug(pageData.title || 'not-found'));
        }
    }

    return results[0];
}

export const getCMSPage = async (slug: string) => {
    await avoidRateLimit()

    return directus.request<ItemsCMSPage[]>(readItems('cms_page', {
        fields: ['*', 'hero.*'],
        filter: {
            slug
        }
    }));
}

export const getLatestWikiArticles = async (limit: number = 3) => {
    await avoidRateLimit()

    return directus.request<ItemsWikiPage[]>(readItems('wiki_page', {
        fields: ['hero', 'slug', 'date_updated', 'title', 'teaser_text', 'content', 'categories.*.*'],
        sort: '-date_updated',
        limit
    }));
}

export const getWikiArticle = async (slug: string) => {
    await avoidRateLimit()

    return directus.request<ItemsWikiPage[]>(readItems('wiki_page', {
        fields: ['*'],
        filter: {
            slug
        }
    }));
}

export const getSanctionMeta = async () => {
    await avoidRateLimit()

    return directus.request<ItemsSanctions[]>(readItems('sanctions', {
        fields: ['entity.*', 'purpose.*.*', 'sector.*.*', 'type.*.*']
    }));
}

export const getSanctions = async ({ page = 1, limit = 25, filters }: { page: number, limit: number, filters: ReadonlyURLSearchParams }) => {
    await avoidRateLimit()

    // I need this because of the different places this is being used.... weird shit
    let filtersObject = transformSanctionFiltersToDirectusFilters(filters);
    // filtersObject = {};
    const data = await directus.request<ItemsSanctions[]>(readItems('sanctions', {
        fields: [
            '*',
            'entity.*.*',
            'purpose.*.*',
            'sector.*.*',
            'type.*.*'
        ],
        limit: limit,
        offset: (page - 1) * limit,
        filter: filtersObject || {}, //{ sector: { sanction_sectors_id: { title: { _eq: "agriculture" } } } },
        search: (filters).get('search') || ""
    }));

    const total_count = await directus.request<{ count: number }[]>(aggregate('sanctions', { aggregate: { count: '*' } }));
    return new Promise<{ data: ItemsSanctions[], total_count: number }>(resolve => {
        resolve({
            data,
            total_count: total_count[0].count
        });
    });
}

export const homepageFields = [
    '*',
    {
        blocks: [
            '*',
            {
                item: ['*.*', {
                    block_cardgroup: [ // Need to specify seperately because I can't fetch 3 levels deep for related items.
                        '*.*',
                        'cards.*',
                        'cards.custom_icon.*', // Fetching everything from custom_icon
                        'cards.custom_icon.directus_files_id.*'
                    ],
                }]
            }
        ]
    }
];

export const getHomepage = async () => {
    await avoidRateLimit()

    return directus.request<ItemsHomepage>(readItems('homepage', {
        fields: homepageFields
    }));
}

const transformSanctionFiltersToDirectusFilters = (filters: ReadonlyURLSearchParams) => {
    const keyWhitelist = ['short_description', 'title', 'sector', 'type', 'reason', 'entity'];
    // Those need to be handled differently
    const m2mKeyWhitelist = ['sector', 'type', 'reason'];

    /**
     * Directus Syntax: https://docs.directus.io/reference/filter-rules.html
     * 
     * {
     *   <field>: {
     *	   <operator>: <value>
     *   }
     * }
     */
    const transformed = Object.entries(convertSearchParamsToObject(filters)).reduce((acc, [key, value]) => {
        let payload: any = {
            _contains: value
        };

        if (m2mKeyWhitelist.includes(key)) {
            payload = {
                [`sanction_${pluralizeLibrary(key)}_id`]: { title: { _eq: Array.isArray(value) ? value.join(',') : value } }
            }
        }

        if (key === 'entity') {
            payload = {
                title: {
                    _contains: value
                }

            }
        }

        if (keyWhitelist.includes(key)) {
            return {
                ...acc,
                [key]: payload
            };
        }
        return acc;
    }, {});

    return transformed;
}

export const convertSearchParamsToObject = (searchParams: ReadonlyURLSearchParams): Record<string, string> => {
    const obj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

// This is a delay during build to avoid rate limiting. See: https://github.com/vercel/next.js/discussions/18550#discussioncomment-1248384
export function avoidRateLimit(delay = 500) {
    if (!process.env.IS_BUILD) {
        return
    }

    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


export default directus;