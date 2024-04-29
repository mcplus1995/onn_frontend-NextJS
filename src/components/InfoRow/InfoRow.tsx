import { FC, HTMLAttributes } from "react";

type InfoRowProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  value: string | JSX.Element;
  spaced?: boolean;
  invert?: boolean;
};

const InfoRow: FC<InfoRowProps> = ({
  name,
  value,
  spaced,
  invert,
  children,
  ...other
}) => {
  return (
    <div
      className={
        "mb-1 " + (spaced ? "is-flex is-justify-content-space-between" : "")
      }
      {...other}
    >
      <span className={invert ? "" : "has-text-weight-bold"}>{name} </span>
      <span className={invert ? "has-text-weight-bold" : ""}>{value}</span>
    </div>
  );
};

export default InfoRow;
