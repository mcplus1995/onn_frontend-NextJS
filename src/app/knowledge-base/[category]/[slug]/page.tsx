import { adminDirectus, getWikiArticle } from "@/utils/directus";

import { ItemsCMSPage } from "@/robot/backendSchemas";
import { readItems } from "@directus/sdk";
import clsx from "clsx";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

type PageProps = {
  params: { category: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ params, searchParams }: PageProps) {
  let pageData = null;
  if (searchParams.preview === "true" && searchParams.id) {
    pageData = await adminDirectus.request<ItemsCMSPage[]>(
      readItems("wiki_page", {
        filter: {
          id: { _eq: searchParams.id },
        },
      })
    );
  } else {
    pageData = await getWikiArticle(params.slug);
  }

  if (!pageData || pageData.length === 0) return notFound();

  return (
    <div className={clsx(styles.container)}>
      <h1>{pageData[0].title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: pageData[0].content || "" }}
      ></div>
    </div>
  );
}
