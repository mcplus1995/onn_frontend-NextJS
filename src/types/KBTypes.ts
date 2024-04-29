import { JSONContent } from "@tiptap/react";

export type Category = {
  tag: string;
  things: CategoryThing[];
  intro_text: string;
};

export type CategoryThing = {
  id: string;
  title: string;
  slug: string;
  url: string;
  parent?: Partial<CategoryThing>;
  content: JSONContent;
  published_at: string;
  revisioned_at: string;
};

export type CategoryThingWithChildren = CategoryThing & {
  children?: CategoryThing[];
};

export type NavItem = {
  id?: number,
  title: string;
  slug: string;
  description: string;
  isActive: boolean;
};

export type Article = CategoryThingWithChildren;

export type TipTapImageData = {
  type: string;
  attrs: {
    alt?: string;
    src: string;
    float: "left" | "right" | "none";
    isDraggable: boolean;
    margin: number;
    title?: string;
    width: string;
  };
  content?: JSONContent | [];
};
