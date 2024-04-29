"use client";

import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import CategoryNavbar from "@/components/CategoryNavbar/CategoryNavbar";
import CategorySidebar from "@/components/CategorySidebar/CategorySidebar";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import IconText from "@/components/IconText/IconText";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import SearchBar from "@/components/SearchBar/SearchBar";
import clsx from "clsx";
import { linkifyWikiCategory } from "@/utils/linkUtils";
import { stringToSlug } from "@/utils/stringUtils";
import styles from "./page.module.scss";
import { useCategoryNavbarItems } from "@/hooks/CategoryNavbarItems";
import { useReadItemsWikiPage } from "@/robot/backendComponents";

type PageProps = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page: FC<PageProps> = ({
  params,
  searchParams,
  ...other
}): JSX.Element => {
  const { categoryNavbarItems } = useCategoryNavbarItems();

  let activeCategory = categoryNavbarItems.find(
    (item) => item.slug === params.category
  );

  if (!activeCategory) activeCategory = categoryNavbarItems[0];

  const {
    data: categoryData,
    isLoading,
    isError,
    error,
  } = useReadItemsWikiPage({
    queryParams: {
      fields: ["*", "categories.wiki_category_id.description"],
      filter: [
        JSON.stringify({
          categories: {
            wiki_category_id: {
              _eq: activeCategory?.id,
            },
          },
        }),
      ],
    },
  });

  const categorySlug = params.category
    ? stringToSlug(params.category?.toString())
    : "";

  return (
    <div className={clsx(styles.pageContainer)} {...other}>
      <div
        className={clsx(
          "container",
          "is-fullhd",
          "is-flex",
          "is-justify-content-end",
          "is-hidden-mobile"
        )}
      >
        <SearchBar
          targetUri={`/knowledge-base/search`}
          placeholder="Search the knowledge base"
        />
      </div>

      <Breadcrumbs
        last={[
          { path: "/knowledge-base", label: "Knowledge Base" },
          {
            path: `${`/knowledge-base/${categorySlug}`}`,
            label: `${
              params.category.toString().charAt(0).toUpperCase() +
              params.category.slice(1)
            }`,
          },
        ]}
      />
      {isLoading ? (
        <LoadingComponent size="45px" className={styles.loadingSpinner} />
      ) : (
        <>
          <CategoryNavbar items={categoryNavbarItems} />

          <div className={clsx(styles.container, "container", "is-fullhd")}>
            {activeCategory && (
              <div className={styles.returnLink}>
                <Link href={linkifyWikiCategory(activeCategory)} passHref>
                  <div>
                    <IconText
                      icon={<FaArrowLeft />}
                      text={`Return to Overview`}
                    />
                  </div>
                </Link>
              </div>
            )}
            <div className={styles.contentContainer}>
              <CategorySidebar
                className={clsx(styles.sidebar, "is-hidden-mobile")}
                title={activeCategory?.title || ""}
                intro={activeCategory?.description || ""}
                articles={categoryData?.data || []}
                category={activeCategory}
              />
              <div className={styles.categoryIntroContainer}>
                <h1 className={styles.category}>{activeCategory?.title}</h1>
                <p>{activeCategory?.description}</p>
              </div>
              {/* <Article article={activeArticle} />
      <Footnotes tiptapContent={activeArticle} /> */}
            </div>
          </div>
        </>
      )}
    </div>
    // <div className={clsx(styles.container, className)} {...other}>
    //   Category Page for category: {params.category}
    // </div>
  );
};

export default Page;
