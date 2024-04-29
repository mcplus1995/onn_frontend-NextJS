"use client";

import { FC, HTMLAttributes } from "react";

import { useReadItemsCMSPage } from "@/robot/backendComponents";
import clsx from "clsx";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import styles from "./CMSPage.module.scss";

type CMSPageProps = HTMLAttributes<HTMLDivElement> & {
  slug: string;
};

const CMSPage: FC<CMSPageProps> = ({
  className,
  slug,
  ...other
}): JSX.Element => {
  const { data, isLoading, error, isError } = useReadItemsCMSPage(
    {
      queryParams: {
        fields: ["*"],
        filter: [
          JSON.stringify({
            slug: {
              _eq: slug,
            },
          }),
        ],
      },
    },
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={clsx(styles.container, className)} {...other}>
      {isError && <ErrorHandler error={error} />}

      {data &&
        data.data?.map((item) => (
          <>
            <h1>{item.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: item.content || "" }}></div>
          </>
        ))}
    </div>
  );
};

export default CMSPage;
