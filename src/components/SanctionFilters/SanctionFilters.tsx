import { FC, HTMLAttributes } from "react";

import FilterForm from "./FilterForm";
import clsx from "clsx";
import styles from "./SanctionFilters.module.scss";

type SanctionFiltersProps = HTMLAttributes<HTMLDivElement> & {};

const SanctionFilters: FC<SanctionFiltersProps> = ({
  className,
  ...other
}): JSX.Element => {
  return (
    <div className={clsx(styles.container, className)} {...other}>
      <FilterForm />
    </div>
  );
};

export default SanctionFilters;
