import {
  ItemsBlockCardgroup,
  ItemsBlockHero,
  ItemsHomepage,
} from "@/robot/backendSchemas";
import { adminDirectus, getHomepage, homepageFields } from "@/utils/directus";

import CardGroupBlock from "@/components/BlockRenderers/CardGroupBlock";
import HeroBlock from "@/components/BlockRenderers/HeroBlock";
import { readItems } from "@directus/sdk";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import styles from "./page.module.scss";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let homepage = null;
  if (searchParams.preview === "true" && searchParams.id) {
    console.log({ preview: true });
    homepage = await adminDirectus.request<ItemsHomepage>(
      readItems("homepage", {
        fields: homepageFields,
        filter: {
          id: { _eq: searchParams.id },
        },
      })
    );
    // Break the cache for live preview to work properly
    revalidatePath("/", "page");
  } else {
    homepage = await getHomepage();
  }

  return (
    <div className={clsx(styles.container)}>
      {homepage.blocks?.map((block, index) => {
        // Skip if we didn't fetch the full related data
        if (typeof block === "number") return null;
        switch (block.collection) {
          case "block_hero":
            return (
              <HeroBlock
                key={block.id || `hero-block-${index}`}
                data={block.item as ItemsBlockHero}
              />
            );

          case "block_cardgroup":
            return (
              <CardGroupBlock
                key={block.id || `hero-block-${index}`}
                data={block.item as ItemsBlockCardgroup}
              />
            );
          default:
            return <>No renderer found for block {block.collection}</>;
        }
      })}
    </div>
  );
}
