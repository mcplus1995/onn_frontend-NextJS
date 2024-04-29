import { ItemsBlockHero, ItemsWikiCategory, ItemsWikiPage } from "@/robot/backendSchemas";

import { NavItem } from "@/types/KBTypes";
import env from "@/env";

export function linkifyKBArticle(article: ItemsWikiPage, category: ItemsWikiCategory | string) {
    return linkifyGeneric({ path: `/knowledge-base/${typeof category === 'string' ? category : category.slug}/${article.slug}`, target: 'frontend' });
}

export function linkifyAsset(asset: ItemsBlockHero['image']) {
    if (!asset) return '';

    return linkifyGeneric({ path: `/assets/${typeof asset === 'string' ? asset : asset.id}`, target: 'backend' });
}

export function linkifyWikiCategory(category: ItemsWikiCategory | NavItem) {
    return linkifyGeneric({ path: `/knowledge-base/${typeof category === 'string' ? category : category?.slug || 'unknown-category'}`, target: 'frontend' });
}

export function linkifyCMSPage(slug: string) {
    return linkifyGeneric({ path: `/p/${slug}`, target: 'frontend' });
}

export function linkifyGeneric(options: { path: string, target?: "backend" | "frontend", base?: string }): string {
    let url = null
    if (options.base) {
        url = new URL(options.path, options.base);
    } else {
        if (options.target === "frontend") {
            url = new URL(options.path, env.urls.frontend);
        } else if (options.target === "backend") {
            url = new URL(options.path, env.urls.backend);
        }
    }


    return url ? url.toString() : '';
}