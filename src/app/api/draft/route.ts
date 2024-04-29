import { adminDirectus } from '@/utils/directus';
import { readItem } from '@directus/sdk';
import { draftMode } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const id = searchParams.get('id');
    const collection = searchParams.get('collection');

    if (secret !== 'noodlesrocks') {
        return new Response('Invalid token', { status: 401 });
    }

    if (!id) {
        return new Response('Missing id', { status: 401 });
    }

    if (!collection) {
        return new Response('Missing collection', { status: 401 });
    }

    try {
        const data = await adminDirectus.request(readItem(collection, id));

        if (!data) {
            return new Response('Invalid id', { status: 401 });
        }

        draftMode().enable();

        switch (collection) {
            case 'homepage':
                return new Response(null, {
                    status: 307,
                    headers: {
                        Location: `/?preview=true&id=${id}`,
                    },
                });
            case 'cms_page':
                return new Response(null, {
                    status: 307,
                    headers: {
                        Location: `/p/${data.slug}?preview=true&id=${id}`,
                    },
                });
        }

    } catch (e) {
        console.error(`Error fetching from collection ${collection}: ${e}`);
        throw e;
    }
}