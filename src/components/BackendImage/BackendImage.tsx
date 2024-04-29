import { FC, HTMLAttributes } from "react";

import { ItemsBlockHero } from "@/robot/backendSchemas";
import { linkifyAsset } from "@/utils/linkUtils";
import clsx from "clsx";
import Image from "next/image";
import styles from "./BackendImage.module.scss";

type BackendImageProps = HTMLAttributes<HTMLDivElement> & {
  image: ItemsBlockHero["image"];
  caption?: string;
};

const normalize = (input: string) => {
  return input.replace("(c)", "©");
};

const BackendImage: FC<BackendImageProps> = ({
  className,
  image,
  caption,
  ...other
}): JSX.Element => {
  if (!image) return <></>;

  let xOffset = 50;
  let yOffset = 50;

  if (typeof image === "object") {
    const focalX = image.focal_point_x;
    const focalY = image.focal_point_y;
    const imageWidth = image.width;
    const imageHeight = image.height;

    if (focalX && focalY && imageWidth && imageHeight) {
      xOffset = (focalX / imageWidth) * 100;
      yOffset = (focalY / imageHeight) * 100;
    }
  }

  return (
    <div className={clsx(styles.container, styles.hero, className)} {...other}>
      <figure className={styles.figureParent}>
        <Image
          src={linkifyAsset(image)}
          alt={"Hero"}
          fill={true}
          style={{
            objectPosition: `${xOffset}% ${yOffset}%`,
          }}
        />
        {caption && <figcaption>{normalize(caption)}</figcaption>}
      </figure>
    </div>
  );
};

export default BackendImage;
