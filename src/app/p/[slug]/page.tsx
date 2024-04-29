import { adminDirectus, getCMSPage, getGlobals } from "@/utils/directus";

import BackendImage from "@/components/BackendImage/BackendImage";
import { ItemsCMSPage } from "@/robot/backendSchemas";
import { formatDate } from "@/utils/utils";
import { readItems } from "@directus/sdk";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

export async function generateMetadata() {
  const globals = await getGlobals();
  return {
    title: globals.title,
    description: globals.description,
  };
}

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Page({ params, searchParams, ...other }: PageProps) {
  let pageData = null;
  if (searchParams.preview === "true" && searchParams.id) {
    pageData = await adminDirectus.request<ItemsCMSPage[]>(
      readItems("cms_page", {
        fields: ["*", "hero.*"],
        filter: {
          id: { _eq: searchParams.id },
        },
      })
    );
    // Break the cache for live preview to work properly
    revalidatePath("/p/[slug]", "page");
  } else {
    pageData = await getCMSPage(params.slug);
  }

  if (!pageData || pageData.length === 0) return notFound();

  const pageTags = pageData[0].tags as unknown as string[];

  return (
    <div className={clsx(styles.container)} {...other}>
      {pageData.map((page: ItemsCMSPage) => {
        return (
          <div key={page.id}>
            {page.hero && (
              <BackendImage
                className={styles.hero}
                image={page.hero}
                caption={page.hero_caption || ""}
              />
            )}
            <div className={styles.content}>
              <h1>{page.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: page.content || "" }}
              ></div>
            </div>
            <div className={styles.meta}>
              {pageTags && pageTags.length > 0 && (
                <>
                  <h5>Tags</h5>
                  <div className={styles.tags}>
                    {pageTags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
              <p className={styles["last-updated"]}>
                Last Updated: {formatDate(page.date_updated)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Page;
