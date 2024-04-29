import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { FC } from "react";
import Link from "next/link";
import ReadingPane from "@/components/SanctionsContainer/ReadingPane";
import SanctionFilters from "@/components/SanctionFilters/SanctionFilters";
import SanctionsContainer from "@/components/SanctionsContainer/SanctionsContainer";
import clsx from "clsx";
import { linkifyGeneric } from "@/utils/linkUtils";
import styles from "./page.module.scss";

type PageProps = {
  searchParams: { [key: string]: string | string[] };
  params: { [key: string]: string | string[] };
};

const Page: FC<PageProps> = async ({
  searchParams,
  params,
  ...other
}): Promise<JSX.Element> => {
  return (
    <div className={clsx(styles.container)} {...other}>
      <Breadcrumbs
        last={[
          { path: "/", label: "Sanctions Database" },
          {
            path: "/sanctions/details",
            label: "Sanctions Database Details",
          },
        ]}
      />

      <div className={"my-6 container is-flex is-flex-direction-column"}>
        <h1 className="mb-0 is-size-2">Sanctions Database</h1>
        <h4>Why this database?</h4>
        <br />
        <div className={styles.xplainer}>
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
            could be found in the Knowledge Base under the &quot;
            <Link
              className={"styled-link"}
              href="https://analysis.opennuclear.org/knowledge-base/political/sanctions-on-the-dprk"
            >
              Sanctions on the DPRK
            </Link>
            &quot; section. The dataset was curated by Yerim Seo, ONN Research
            Consultant, and reviewed by independent external experts. The
            database is updated as of 1 July 2023.
          </p>
        </div>
        <Link
          href={linkifyGeneric({
            path: "/sanctions/stats",
            target: "frontend",
          })}
          className={clsx("button mt-3 is-align-self-flex-end", styles.button)}
        >
          Go To Diagrams{" >"}
        </Link>
      </div>
      <div
        className={clsx(
          "my-6 container columns is-fluid",
          styles.sanctionsContainer
        )}
      >
        <SanctionFilters className={clsx("column ")} />
        <SanctionsContainer className={clsx("column")} />
        <ReadingPane />
      </div>
      <div className={styles.separator} />
      <div className={"container has-text-centered pt-5 px-0 is-fluid"}>
        <div className={"container"}>
          <h5>Disclaimer</h5>
          <p>
            Open Nuclear Network makes its best effort to ensure the accuracy of
            all material reproduced in the database. Notwithstanding the
            foregoing, it may contain errors or omissions, and Open Nuclear
            Network shall not be liable for any damage that may result from
            errors or omissions in the database. In case legislations are
            published in a language other than English, an unofficial
            translation has been provided in addition to a link to the original
            version. We welcome your suggestions and comments on any errors,
            omissions, or additions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
