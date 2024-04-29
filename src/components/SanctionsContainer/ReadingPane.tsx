"use client";

import {
  FC,
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { FaXmark } from "react-icons/fa6";
import Sanction from "./Sanction";
import { SanctionMeta } from "@/types/SanctionsTypes";
import { SanctionsContext } from "@/contexts/SanctionsContext";
import { aggregateMetaData } from "@/utils/sanctionUtils";
import clsx from "clsx";
import { getSanctionMeta } from "@/utils/directus";
import styles from "./ReadingPane.module.scss";
import { useOnClickOutside } from "@/hooks";

type ReadingPaneProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};

const ReadingPane: FC<ReadingPaneProps> = ({ open: initialOpen = false }) => {
  const [open, setOpen] = useState(initialOpen || false);
  const [topPadding, setTopPadding] = useState<number>();
  const [sanctionMeta, setSanctionmeta] = useState<SanctionMeta>();

  useEffect(() => {
    getSanctionMeta().then((data) => {
      const meta = aggregateMetaData(data!);
      if (!meta) return;
      setSanctionmeta(meta);
    });
  }, []);

  const sanctionsContext = useContext(SanctionsContext);

  const clickOutsideRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    sanctionsContext!.handleSetSelectedSanction!(null);
  }, [sanctionsContext]);

  useOnClickOutside(clickOutsideRef, handleClose);

  useEffect(() => {
    const navbar = document.querySelector("#primaryNavbar");
    if (!navbar) return;
    setTopPadding(navbar.clientHeight);
    if (sanctionsContext!.selectedSanction !== null) {
      setOpen(true);
    } else {
      handleClose();
    }
  }, [sanctionsContext, handleClose]);

  if (!sanctionsContext) return <></>;
  return (
    <div
      className={clsx("column", styles.container, !open && styles.close)}
      data-top-padding={topPadding}
      style={{ paddingTop: `calc(${topPadding}px + 2rem` }}
      ref={clickOutsideRef}
    >
      <div className={styles.closeHandle} onClick={handleClose}>
        <FaXmark size={"24"} />
      </div>
      {!sanctionsContext.selectedSanction && <p>Loading...</p>}
      {sanctionsContext.selectedSanction && (
        <Sanction
          meta={sanctionMeta!}
          sanction={sanctionsContext.selectedSanction}
        />
      )}
    </div>
  );
};

export default ReadingPane;
