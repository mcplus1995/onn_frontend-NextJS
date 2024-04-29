import { FC, HTMLAttributes } from "react";

import Image from "next/image";
import { ItemsBlockHero } from "@/robot/backendSchemas";
import clsx from "clsx";
import { linkifyAsset } from "../../utils/linkUtils";
import styles from "./HeroBlock.module.scss";

type HeroBlockProps = HTMLAttributes<HTMLDivElement> & { data: ItemsBlockHero };

const HeroBlock: FC<HeroBlockProps> = ({
  className,
  data,
  ...other
}): JSX.Element => {
  return (
    <div
      className={clsx(styles.container, className)}
      {...other}
      style={{ "--overlay-color": data.overlay_color } as React.CSSProperties}
    >
      <Image
        src={linkifyAsset(data.image)}
        fill={true}
        alt={`Hero Image ${data.overlay_text || ""}`}
      />
      <div className={clsx("container", styles.overlayContainer)}>
        <h1>{data.overlay_text}</h1>
      </div>
    </div>
  );
};

export default HeroBlock;
