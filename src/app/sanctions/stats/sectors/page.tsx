import ChartArea from "@/components/ChartArea/ChartArea";
import { FC } from "react";
import clsx from "clsx";
import styles from "./page.module.scss";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { slug: string };
};

const Page: FC<PageProps> = ({
  searchParams,
  params,
  ...other
}): JSX.Element => {
  return (
    <div className={clsx(styles.container)} {...other}>
      <ChartArea dataKey={"sectors"} />
    </div>
  );
};

export default Page;
