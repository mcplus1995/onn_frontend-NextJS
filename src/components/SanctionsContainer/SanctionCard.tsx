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

import InfoRow from "@/components/InfoRow/InfoRow";
import { SanctionMeta } from "@/types/SanctionsTypes";
import SanctionStatus from "@/components/SanctionStatus/SanctionStatus";
import { SanctionsContext } from "@/contexts/SanctionsContext";
import clsx from "clsx";
import { formatDate } from "@/utils/utils";
import { mapToMeta } from "@/utils/sanctionUtils";
import styles from "./SanctionCard.module.scss";

type SanctionCardProps = HTMLAttributes<HTMLDivElement> & {
  sanction?: ItemsSanctions;
  header?: boolean;
  meta?: SanctionMeta;
};

const SanctionCard: FC<SanctionCardProps> = ({ sanction, header, meta }) => {
  const sanctionsContext = useContext(SanctionsContext);
  meta =
    meta ||
    ({
      sanction_sources: {},
      sanction_types: {},
      sanction_reasons: {},
      sanction_sectors: {},
    } as SanctionMeta);

  if (header) {
    return (
      <div
        className={clsx(
          styles.card,
          " columns pt-2 is-hidden-mobile",
          styles.headerRow
        )}
      >
        <div className="column is-3">Info</div>
        <div className="column is-7">Description</div>
        <div className="column is-2">Date</div>
      </div>
    );
  }

  if (!sanction) return <></>;

  const metaSanctionSources = mapToMeta(
    (sanction.entity as ItemsSanctionEntities).title!,
    meta.sanction_sources
  );
  const metaSanctionReasons = mapToMeta(
    (sanction.purpose as ItemsSanctionsSanctionPurposes[])!.map(
      (p) => (p.sanction_purposes_id as ItemsSanctionPurposes).title!
    ),
    meta.sanction_reasons
  );
  const metaSanctionTypes = mapToMeta(
    (sanction.type as ItemsSanctionsSanctionTypes[])!.map(
      (t) => (t.sanction_types_id as ItemsSanctionTypes).title!
    ),
    meta.sanction_types
  );
  const metaSanctionSectors = mapToMeta(
    (sanction.sector as ItemsSanctionsSanctionSectors[])!.map(
      (s) => (s.sanction_sectors_id as ItemsSanctionSectors).title!
    ),
    meta.sanction_sectors
  );

  return (
    <div
      className={styles.cardContainer}
      onClick={() => {
        sanctionsContext!.handleSetSelectedSanction!(sanction);
      }}
    >
      <div className={styles.titleRow}>
        <div>
          <b>
            Ref:{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: sanctionsContext!.wrapFilterTermsInText!(
                  sanction.reference || "-"
                ),
              }}
            ></span>
          </b>
        </div>
      </div>
      <div className={styles.statusRow}>
        <SanctionStatus status={sanction.sanction_status} />
      </div>
      <div className={styles.card + " columns"}>
        <div className="column is-3">
          <InfoRow
            name="Reasons:"
            value={
              <span
                dangerouslySetInnerHTML={{
                  __html: sanctionsContext!.wrapFilterTermsInText!(
                    metaSanctionReasons
                  ).replaceAll("None", "-"),
                }}
              ></span>
            }
          />
          <InfoRow
            name="Types:"
            value={
              <span
                dangerouslySetInnerHTML={{
                  __html: sanctionsContext!.wrapFilterTermsInText!(
                    metaSanctionTypes
                  ).replaceAll("None", "-"),
                }}
              ></span>
            }
          />
          <InfoRow
            name="Sectors:"
            value={
              <span
                dangerouslySetInnerHTML={{
                  __html: sanctionsContext!.wrapFilterTermsInText!(
                    metaSanctionSectors
                  ).replaceAll("None", "-"),
                }}
              ></span>
            }
          />
          <InfoRow
            name="Entity:"
            value={
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    sanctionsContext!.wrapFilterTermsInText!(
                      metaSanctionSources
                    ),
                }}
              ></span>
            }
          />
        </div>
        <div className={clsx(styles.descriptionColumn, "column is-7")}>
          <p
            dangerouslySetInnerHTML={{
              __html: sanctionsContext!.wrapFilterTermsInText!(
                sanction.short_description || "-"
              ),
            }}
          ></p>
        </div>
        <div className="column is-2">{formatDate(sanction.date_created)}</div>
      </div>
    </div>
  );
};

export default SanctionCard;
