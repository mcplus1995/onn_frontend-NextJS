"use client";

import { FC, HTMLAttributes, useContext } from "react";
import {
  ItemsSanctionEntities,
  ItemsSanctionPurposes,
  ItemsSanctionSectors,
  ItemsSanctionTypes,
  ItemsSanctions,
  ItemsSanctionsSanctionPurposes,
  ItemsSanctionsSanctionSectors,
  ItemsSanctionsSanctionTypes,
} from "@/robot/backendSchemas";

import { FaChevronRight } from "react-icons/fa";
import IconText from "@/components/IconText/IconText";
import Link from "next/link";
import { SanctionMeta } from "@/types/SanctionsTypes";
import SanctionStatus from "@/components/SanctionStatus/SanctionStatus";
import { SanctionsContext } from "@/contexts/SanctionsContext";
import clsx from "clsx";
import { mapToMeta } from "@/utils/sanctionUtils";
import { nl2br } from "@/utils/stringUtils";
import styles from "./Sanction.module.scss";

type SanctionProps = HTMLAttributes<HTMLDivElement> & {
  sanction: ItemsSanctions;
  meta: SanctionMeta;
};
const Sanction: FC<SanctionProps> = ({ sanction, meta }): JSX.Element => {
  const sanctionsContext = useContext(SanctionsContext);
  meta =
    meta ||
    ({
      sanction_sources: {},
      sanction_types: {},
      sanction_reasons: {},
      sanction_sectors: {},
    } as SanctionMeta);

  if (!sanction) return <></>;
  const metaSanctionSources = mapToMeta(
    (sanction.entity as ItemsSanctionEntities)?.title!,
    meta.sanction_sources
  );
  const metaSanctionReasons = mapToMeta(
    (sanction.purpose as ItemsSanctionsSanctionPurposes[])?.map(
      (p) => (p.sanction_purposes_id as ItemsSanctionPurposes).title!
    ),
    meta.sanction_reasons
  );
  const metaSanctionTypes = mapToMeta(
    (sanction.type as ItemsSanctionsSanctionTypes[])?.map(
      (t) => (t.sanction_types_id as ItemsSanctionTypes).title!
    ),
    meta.sanction_types
  );
  const metaSanctionSectors = mapToMeta(
    (sanction.sector as ItemsSanctionsSanctionSectors[])?.map(
      (s) => (s.sanction_sectors_id as ItemsSanctionSectors).title!
    ),
    meta.sanction_sectors
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: sanctionsContext!.wrapFilterTermsInText!(
              sanction.reference || "Ref: -",
              "mark"
            ),
          }}
        ></h2>
        <h3
          className={styles.subtitle}
          dangerouslySetInnerHTML={{
            __html: sanctionsContext!.wrapFilterTermsInText!(
              metaSanctionSources,
              "mark"
            ),
          }}
        ></h3>
      </header>

      <div className={clsx(styles.metadataGrid)}>
        <span className={clsx(styles.metadataTitle)}>Reasons:</span>
        <span
          className={styles.metadataValue}
          dangerouslySetInnerHTML={{
            __html: sanctionsContext!.wrapFilterTermsInText!(
              metaSanctionReasons,
              "mark"
            ),
          }}
        ></span>

        <span className={clsx(styles.metadataTitle)}>Types:</span>
        <span
          className={styles.metadataValue}
          dangerouslySetInnerHTML={{
            __html: sanctionsContext!.wrapFilterTermsInText!(
              metaSanctionTypes,
              "mark"
            ),
          }}
        ></span>

        <span className={clsx(styles.metadataTitle)}>Sectors:</span>
        <span
          className={styles.metadataValue}
          dangerouslySetInnerHTML={{
            __html: sanctionsContext!.wrapFilterTermsInText!(
              metaSanctionSectors,
              "mark"
            ),
          }}
        ></span>
      </div>
      <SanctionStatus status={sanction.sanction_status} variant={"slim"} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: sanctionsContext!.wrapFilterTermsInText!(
            sanction.text_internal
              ? nl2br(sanction.text_internal)
              : nl2br(sanction.short_description || "-"),
            "mark"
          ),
        }}
      ></div>
      <footer className={styles.footer}>
        {sanction.link && (
          <Link
            className={clsx("button", styles.cta)}
            target="_blank"
            href={sanction.link}
            rel="noopener noreferrer"
          >
            <IconText reversed icon={<FaChevronRight />} text="View Source" />
          </Link>
        )}
      </footer>
    </div>
  );
};

export default Sanction;
