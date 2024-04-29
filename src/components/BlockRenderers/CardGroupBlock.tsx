import {
  ItemsBlockCardgroup,
  ItemsBlockCardgroupCards,
} from "@/robot/backendSchemas";
import { FC, HTMLAttributes } from "react";

import { linkifyAsset } from "@/utils/linkUtils";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./CardGroupBlock.module.scss";
import cardGroupCardBlockStyles from "./CardGroupCardBlock.module.scss";

type CardGroupCardBlockProps = HTMLAttributes<HTMLDivElement> & {
  data: ItemsBlockCardgroupCards;
};

const CardGroupCardBlock: FC<CardGroupCardBlockProps> = ({
  className,
  data,
  ...other
}): JSX.Element => {
  return (
    <div
      className={clsx(cardGroupCardBlockStyles.container, className)}
      {...other}
    >
      {data.custom_icon && (
        <div className={cardGroupCardBlockStyles.cardIconContainer}>
          <Image src={linkifyAsset(data.custom_icon)} alt="icon" fill={true} />
        </div>
      )}

      <h2 className={cardGroupCardBlockStyles.cardTitle}>{data.headline} </h2>
      <p className={cardGroupCardBlockStyles.cardDescription}>{data.content}</p>
      {data.link && (
        <Link
          href={data.link_url!}
          className={cardGroupCardBlockStyles.cardLink}
        >
          {data.link_label} {">"}
        </Link>
      )}
    </div>
  );
};

type CardGroupBlockProps = HTMLAttributes<HTMLDivElement> & {
  data: ItemsBlockCardgroup;
};

const CardGroupBlock: FC<CardGroupBlockProps> = ({
  className,
  data,
  ...other
}): JSX.Element => {
  return (
    <div className={clsx(styles.container, className)} {...other}>
      {data.headline && <h2 className={styles.headline}>{data.headline}</h2>}
      {data.content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      )}
      <div className={clsx(styles.cardContainer)}>
        {data.cards?.map((card) => {
          if (typeof card === "number") return null;

          return <CardGroupCardBlock key={card.id} data={card} />;
        })}
      </div>
    </div>
  );
};

export default CardGroupBlock;
