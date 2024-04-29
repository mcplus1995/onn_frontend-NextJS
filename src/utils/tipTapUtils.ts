import { JSONContent } from "@tiptap/react";
import type { TipTapImageData } from "@/types/KBTypes"

export const getFirstContentImage = (
  content: JSONContent
): [TipTapImageData["attrs"] | null, number] => {
  let imageContent: TipTapImageData["attrs"] | null = null;
  let imageContentIndex = -1;

  if (content && content.content) {
    const imageContentItem = content.content.find((item, index) => {
      if (item.type === "resizable-image") {
        imageContentIndex = index;
        return true;
      }
      return false;
    });

    if (imageContentItem) imageContent = imageContentItem.attrs;
  }

  return [imageContent!, imageContentIndex];
};
