"use client";

import { FC, HTMLAttributes, useContext } from "react";
import { FaDownload, FaPrint, FaShareAlt } from "react-icons/fa";

import IconText from "@/components/IconText/IconText";
import { SanctionsContext } from "@/contexts/SanctionsContext";
import clsx from "clsx";
import styles from "./Actions.module.scss";
import { toast } from "react-toastify";

type ActionsProps = HTMLAttributes<HTMLDivElement> & {};

const Actions: FC<ActionsProps> = ({ className, ...other }): JSX.Element => {
  const sanctionsContext = useContext(SanctionsContext);

  // const chartContainer = document.querySelector(
  //   `#${sanctionsContext.selectedStat || "reasons"}`
  // ).parentElement;
  // var a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style.display = "none";
  // toBlob(chartContainer as HTMLElement).then(function (dataUrl) {
  //   const objectURL = URL.createObjectURL(dataUrl);
  //   a.href = objectURL;
  //   a.download = "onn-sanctions-graph";
  //   a.click();
  //   window.URL.revokeObjectURL(objectURL);
  //   a.remove();
  // });

  return (
    <div className={clsx(styles.container, className)} {...other}>
      <ul>
        <li>
          <IconText
            icon={<FaShareAlt />}
            text={<span className={styles.text}>Share</span>}
            className={"is-clickable"}
            onClick={() => {
              navigator.clipboard.writeText(
                new URL(window.location.href).toString()
              );

              toast("Copied to clipboard!", {
                hideProgressBar: true,
                autoClose: 1000,
                type: "success",
                position: "bottom-right",
              });
            }}
          />
        </li>
        <li>
          <IconText
            icon={<FaPrint />}
            text={<span className={styles.text}>Print</span>}
            className={"is-clickable"}
            onClick={() => window.print()}
          />
        </li>
        <li>
          <IconText
            icon={<FaDownload />}
            text={<span className={styles.text}>Download</span>}
            className={"is-clickable"}
            onClick={() => {
              toast("Preparing download...", {
                hideProgressBar: true,
                autoClose: 1000,
                type: "info",
                position: "bottom-right",
              });
            }}
          />
        </li>
      </ul>
    </div>
  );
};

export default Actions;
