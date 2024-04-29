import directus, { getLatestWikiArticles } from "@/utils/directus";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CategoryNavbar from "@/components/CategoryNavbar/CategoryNavbar";
import { FC } from "react";
import FeaturedArticles from "@/components/FeaturedArticles/FeaturedArticles";
import Image from "next/image";
import { ItemsWikiCategory } from "@/robot/backendSchemas";
import SearchBar from "@/components/SearchBar/SearchBar";
import clsx from "clsx";
import logo from "@/assets/images/onn-logo-kb.svg";
import { readItems } from "@directus/sdk";
import styles from "./page.module.scss";

export const metadata = {
  title: "KnowledgeBase",
};

type PageProps = {
  params: Record<string, any>;
  searchParams: Record<string, any>;
};

const KnowledgeBase: FC<PageProps> = async ({
  searchParams,
  params,
  ...other
}): Promise<JSX.Element> => {
  const categoryNavbarItems = await directus.request<ItemsWikiCategory[]>(
    readItems("wiki_category", {
      fields: ["id", "title", "slug", "description", "nav_title"],
    })
  );

  const latestArticles = await getLatestWikiArticles(3);

  return (
    <div className={clsx(styles.pageContainer)} {...other}>
      <Breadcrumbs
        last={[{ path: `/knowledge-base`, label: `Knowledge Base` }]}
      />
      <div className={styles.container}>
        <div
          className={clsx(
            styles.searchBarContainer,
            "container",
            "is-fullhd",
            "is-flex",
            "is-justify-content-end"
          )}
        >
          <SearchBar
            targetUri={`/knowledge-base/search`}
            placeholder="Search the knowledge base"
          />
        </div>

        <CategoryNavbar
          items={categoryNavbarItems}
          className={styles.categoryContainer}
        />

        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Open Nuclear Network Logo"
            fill={true}
            priority
          />
        </div>
        <div className={clsx("container", styles.introContainer)}>
          <h1>Knowledge Base</h1>

          <p>
            Open Nuclear Network aims to share accurate and reliable open source
            information to balance out information asymmetry, counter dis- and
            mis-information, and thereby reduce the risk of nuclear escalation.
            In addition to its{" "}
            <a
              href="https://opennuclear.org/publications-analysis-reports?language_content_entity=en"
              target="_blank"
            >
              ONN Analysis Reports
            </a>
            , ONN has collected in this Knowledge Base descriptive articles on
            subjects relevant for analyzing nuclear risk in the Korean
            Peninsula, to include political, nuclear, military and OSINT topics.
          </p>
        </div>

        <FeaturedArticles
          articlesJSON={JSON.stringify(latestArticles)}
          className={styles.featuredArticlesContainer}
        />
      </div>
    </div>
  );
};

export default KnowledgeBase;

// return <><Link href="{linkify(item.slug)}">{item.title}</Link></>;
// const client = new QueryClient();
// api.categories().action()

// const {
//   data: categoriesQueryData,
// }: { data: PaginatedAPIResponse<Category[]> } = queries.useCategories();

// let kbPageData: Category[] = categoriesQueryData
//   ? categoriesQueryData.results
//   : [];

// // Items displayed on category navbar
// const categoryNavbarItems: NavItem[] = kbPageData.map((p) => {
//   return {
//     title: p.tag,
//     slug: stringToSlug(p.tag),
//     isActive: false,
//   };
// });
