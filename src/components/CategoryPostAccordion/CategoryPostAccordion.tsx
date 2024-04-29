import { ItemsWikiCategory, ItemsWikiPage } from "@/robot/backendSchemas";
import { FC, HTMLAttributes, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

import { linkifyKBArticle } from "@/utils/linkUtils";
import clsx from "clsx";
import Link from "next/link";
import styles from "./CategoryPostAccordion.module.scss";

type CategoryPostAccordionProps = HTMLAttributes<HTMLDivElement> & {
  post: ItemsWikiPage;
  active?: boolean;
  activePost?: ItemsWikiPage;
  category: ItemsWikiCategory;
};

const CategoryPostAccordion: FC<CategoryPostAccordionProps> = ({
  post,
  active,
  activePost,
  category,
  className,
  ...other
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(active);
  const handleToggleAccordion = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={clsx(styles.container, className)} {...other}>
      <div onClick={handleToggleAccordion} className={clsx(styles.trigger)}>
        <a>{post.title}</a>
        {isExpanded ? (
          <FaCaretUp className={styles.icon} />
        ) : (
          <FaCaretDown className={styles.icon} />
        )}
      </div>
      {isExpanded && (
        <ul className={clsx(styles.articleList)}>
          <li
            className={clsx(
              styles.articleListItem,
              activePost?.id === post.id ? styles.active : null
            )}
          >
            <Link href={linkifyKBArticle(post, category)}>
              Basic Information
            </Link>
          </li>
          {post.children &&
            post.children.map((child) => {
              if (typeof child === "object" && "id" in child) {
                return (
                  <li
                    key={child.id}
                    className={clsx(
                      styles.articleListItem,
                      activePost?.id === child.id ? styles.active : null
                    )}
                  >
                    <Link href={linkifyKBArticle(child, category)}>
                      {child.title}
                    </Link>
                  </li>
                );
              }

              return null;
            })}
        </ul>
      )}
    </div>
  );
};

export default CategoryPostAccordion;
