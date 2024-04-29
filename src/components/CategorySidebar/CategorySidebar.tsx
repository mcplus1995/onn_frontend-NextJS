import { ItemsWikiCategory, ItemsWikiPage } from "@/robot/backendSchemas";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import {
  FaArrowDownAZ,
  FaArrowDownZA,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa6";

import CategoryPostAccordion from "@/components/CategoryPostAccordion/CategoryPostAccordion";
import Infobox from "@/components/EPDashboard/Infobox/Infobox";
import IconText from "@/components/IconText/IconText";
import { useOnClickOutside } from "@/hooks/index";
import clsx from "clsx";
import styles from "./CategorySidebar.module.scss";

export type SortOption = {
  label: string;
  icon: JSX.Element;
};

const defaultSortOptions: SortOption[] = [
  {
    label: "A-Z",
    icon: <FaArrowDownAZ />,
  },
  {
    label: "Z-A",
    icon: <FaArrowDownZA />,
  },
];

type SortByWidgetProps = {
  sortOptions?: SortOption[];
  defaultSortOption?: SortOption;
  onChange: (sortOption: SortOption) => void;
};

const SortByWidget: FC<SortByWidgetProps> = (props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [chosenOption, setChosenOption] = useState<SortOption>(
    defaultSortOptions[0]
  );
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    props.onChange(chosenOption);
  }, [chosenOption]);

  const sortOptions = props.sortOptions || defaultSortOptions;
  const defaultSortOption = props.defaultSortOption || sortOptions[0];

  return (
    <div className={styles.sortByContainer} ref={ref}>
      <div
        className={clsx(styles.handle, open && styles.open)}
        onClick={() => setOpen(!open)}
      >
        <IconText
          icon={!chosenOption ? defaultSortOption.icon : chosenOption.icon}
          text={!chosenOption ? defaultSortOption.label : chosenOption.label}
        />
        {open ? (
          <FaCaretUp className={clsx("ml-auto", styles.handleIcon)} />
        ) : (
          <FaCaretDown className={clsx("ml-auto", styles.handleIcon)} />
        )}
      </div>

      <div className={clsx(styles.sortOptions, open && styles.open)}>
        <ul>
          {sortOptions.map((sortOption) => (
            <li
              onClick={() => {
                setChosenOption(sortOption);
                setOpen(false);
              }}
              key={sortOption.label}
              className={clsx(
                chosenOption &&
                  chosenOption.label === sortOption.label &&
                  styles.active
              )}
            >
              <IconText text={sortOption.label} icon={sortOption.icon} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type CategorySidebarProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  intro: string;
  articles: ItemsWikiPage[];
  category: ItemsWikiCategory;
};

const CategorySidebar: FC<CategorySidebarProps> = ({
  className,
  title,
  intro,
  articles,
  category,
  ...other
}): JSX.Element => {
  const [localArticles, setLocalArticles] = useState<ItemsWikiPage[]>(articles);

  const sortArticles = (sortOption?: SortOption) => {
    if (!localArticles) return;
    switch (sortOption?.label) {
      case "Z-A":
        setLocalArticles((prev) => {
          return [
            ...prev.sort((a, b) => {
              if (!a.title || !b.title) return 0;
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              return 0;
            }),
          ];
        });
        break;
      case "A-Z":
      default:
        setLocalArticles((prev) => {
          return [
            ...prev.sort((a, b) => {
              if (!a.title || !b.title) return 0;
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
              return 0;
            }),
          ];
        });
        break;
    }
  };

  if (!localArticles) return <></>;

  return (
    <div className={clsx(className, styles.container)} {...other}>
      <div className={styles.categoryArticlesContainer}>
        <SortByWidget onChange={sortArticles} />
        {localArticles?.length === 0 ? (
          <Infobox type="info">No Articles found!</Infobox>
        ) : (
          <ul className={clsx(styles.articleList)}>
            {localArticles?.map((article) => (
              <CategoryPostAccordion
                post={article}
                category={category}
                // active={
                //   article.id === activeArticle?.id ||
                //   article.id === activeArticle?.parent?.id
                // }
                // activePost={activeArticle}
                key={`${article.id}-accordion`}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;
