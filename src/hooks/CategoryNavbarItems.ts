import { useReadItemsWikiCategory } from "@/robot/backendComponents";
import { NavItem } from "@/types/KBTypes";

export const useCategoryNavbarItems = () => {
  const {
    data: categoriesData,
    error,
    isLoading,
    isError,
  } = useReadItemsWikiCategory(
    {
      queryParams: {
        fields: ["id", "slug", "title", "description"],
      },
    },
    {
      staleTime: 1000 * 60 * 1,
    }
  );

  const categoryNavbarItems: NavItem[] = categoriesData?.data
    ? categoriesData.data.map((category) => ({
      id: category.id,
      title: category.title || "",
      description: category.description || "",
      slug: category.slug || "",
      isActive: false,
    }))
    : [];

  return { categoryNavbarItems, isLoading, isError, error };
};
