import { FC, HTMLAttributes } from "react";

import Image from "next/image";
import oef from "@/assets/images/oef.svg";
import styles from "./OEFBlock.module.scss";

type OEFBlockProps = HTMLAttributes<HTMLDivElement> & {
  content: string;
  ctaLabel: string;
  ctaLink: string;
  displayCTA: boolean;
};

const OEFBlock: FC<OEFBlockProps> = ({
  content,
  ctaLabel,
  ctaLink,
  displayCTA,
}) => {
  return (
    <div className={styles.bg}>
      <div className="container">
        <div className="columns is-desktop">
          <div className={styles.logo + " column is-4-desktop"}>
            <Image
              src={oef.src}
              alt="One Earth Future"
              width={oef.width}
              height={oef.height}
            />
          </div>
          <div className={styles.right + " column is-8-desktop"}>
            <p className={styles.text}>{content}</p>
            {displayCTA && (
              <a href={ctaLink} className="button is-cta is-small is-info mt-2">
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OEFBlock;
