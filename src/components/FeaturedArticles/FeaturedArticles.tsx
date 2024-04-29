"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import {
  ItemsWikiCategory,
  ItemsWikiPage,
  ItemsWikiPageWikiCategory,
} from "@/robot/backendSchemas";
import { cleanHtml, formatDate } from "@/utils/utils";
import { linkifyAsset, linkifyKBArticle } from "@/utils/linkUtils";

import { Carousel } from "react-responsive-carousel";
import { FaCalendar } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import Infobox from "../EPDashboard/Infobox/Infobox";
import clsx from "clsx";
import fillerImage from "@/assets/images/filler-image.svg";
import styles from "./FeaturedArticles.module.scss";

type ArticleSliderItemProps = HTMLAttributes<HTMLDivElement> & {
  article: ItemsWikiPage;
};

const ArticleSliderItem: FC<ArticleSliderItemProps> = ({
  article,
  className,
  ...other
}): JSX.Element => {
  const [content, setContent] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");

  useEffect(() => {
    const renderedContent = cleanHtml(article.content || "");
    setContent(renderedContent);

    const category = article.categories?.pop() as ItemsWikiPageWikiCategory;
    const wikiCategorySlug =
      (category?.wiki_category_id as ItemsWikiCategory)?.slug || "undefined";
    setCategorySlug(wikiCategorySlug);
  }, [article, article.content]);

  return (
    <div className={clsx(className, styles.articleSliderItem)} {...other}>
      <a href={linkifyKBArticle(article, categorySlug)}>
        <div
          className={clsx(
            styles.featuredImageContainer,
            !article.hero && styles.fillerImage
          )}
        >
          {article.hero ? (
            <Image
              src={linkifyAsset(article.hero)}
              alt={`Featured Image of Post ${article.title}`}
              fill
            />
          ) : (
            <Image src={fillerImage} alt={`Featured Image Placeholder`} fill />
          )}
        </div>
        <div className={styles.articleContent}>
          <h3>{article.title}</h3>
          <p
            className={styles.articleTeaser}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></p>
        </div>
        <div className={styles.articleFooter}>
          <div className={styles.flexContainer}>
            <FaCalendar />
            <span>
              {formatDate(article.date_updated || article.date_created)}
            </span>
          </div>
          <div className={styles.link}>
            <div className={styles.flexContainer}>
              <p>Read Post</p>
              <FaChevronRight />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

type FeaturedArticlesProps = HTMLAttributes<HTMLDivElement> & {
  articlesJSON: string;
};

const FeaturedArticles: FC<FeaturedArticlesProps> = ({
  articlesJSON, // WTF WHY THE FUCK IS THIS SHIT NECESSARY?!?!?!?!
  className,
  ...other
}): JSX.Element => {
  const articles: ItemsWikiPage[] = JSON.parse(articlesJSON);

  return (
    <div className={clsx(styles.container, className)} {...other}>
      <h2>
        Latest Update
        {articles?.length ? (articles.length > 1 ? "s" : "") : ""}
      </h2>

      {!articles ||
        (articles.length === 0 && (
          <div className="container-fluid mx-5">
            <Infobox type={"info"}>No articles found</Infobox>
          </div>
        ))}
      {
        <Carousel
          className={styles.carousel}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          centerMode={true}
          width={"90%"}
          selectedItem={
            articles?.length ? (articles.length > 2 ? 1 : 0) : undefined
          }
        >
          {articles?.splice(0, 3).map((article, index) => {
            article.title = `${article.title} - ${index}`;
            return (
              <div key={index} className={styles.carouselItem}>
                <ArticleSliderItem article={article} />
              </div>
            );
          })}
        </Carousel>
      }
    </div>
  );
};

export default FeaturedArticles;
