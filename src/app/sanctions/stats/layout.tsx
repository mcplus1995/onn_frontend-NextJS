import { FC, HTMLAttributes, Suspense } from "react";

import Actions from "@/components/Actions/Actions";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import StatsSidebar from "@/components/StatsSidebar/StatsSidebar";
import clsx from "clsx";
import styles from "./layout.module.scss";

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  params: {};
};

const Layout: FC<LayoutProps> = ({
  className,
  children,
  params,
  ...other
}): JSX.Element => {
  return (
    <div className={clsx(styles.container, className)} {...other}>
      <Breadcrumbs
        last={[{ path: `/sanctions`, label: `Sanctions Database` }]}
      />
      <div className={clsx("my-6 container", styles.introContainer)}>
        <div className={styles.xplainer}>
          <h1>Sanctions Database</h1>
          <p>
            The sanctions database is a repository of all the DPRK-related
            sanctions legislation and covers multilateral UN sanction cases and
            bilateral sanctions imposed by the US, EU, ROK, Japan, China, and
            Russia. The database classifies these sanctions by the reasons
            (objectives behind the sanctions), types, and sectors.
          </p>
          <p>
            The purpose of the sanctions database is to provide comprehensive
            and structural analysis of intricate sanctions regime. The detailed
            identification of different types and sectors of sanctions can help
            systemic understanding of the interplay of sanctions policies and
            comparison with different entities.
          </p>
        </div>
        <div className={styles.searchBarContainer}>
          <SearchBar
            targetUri={`/sanctions/details`}
            placeholder={`Search Sanctions Database`}
          />
        </div>
      </div>
      <div className={clsx(styles.contentContainer, className)} {...other}>
        <aside className={styles.sidebar}>
          <Suspense>
            <StatsSidebar />
          </Suspense>
        </aside>
        <section className={styles.content}>{children}</section>
        <Actions className={styles.chartActions} />
      </div>

      <div className={clsx("container", styles.outroContainer)}>
        <div>
          <p>
            The database was launched in July 2023. It contains the laws,
            regulations and other measures related to sanctions against the
            DPRK, such as national legislations, measures for national
            enforcement and international agreements. The data provides
            information on the current DPRK sanctions regimes, including a short
            description of imposed measure, date of adoption, classification and
            link to its original source.
          </p>
          <p>
            More information on the individual sanctions regimes of each actor
            could be found in the Knowledge Base under the
            <Link href="https://analysis.opennuclear.org/knowledge-base/political/sanctions-on-the-dprk">
              Sanctions on the DPRK
            </Link>
            section. The dataset was curated by Yerim Seo, ONN Research
            Consultant, and reviewed by independent external experts. The
            database is updated as of 1 July 2023.
          </p>
        </div>
        <Link
          className={clsx("button", styles.button)}
          href="/sanctions/details"
        >
          Go To Database {">"}
        </Link>
      </div>
    </div>
  );
};

export default Layout;
