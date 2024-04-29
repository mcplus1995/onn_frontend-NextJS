import SanctionClientComponents from "@/components/SanctionClientComponents/SanctionClientComponents";
import { SanctionsContextProvider } from "@/contexts/SanctionsContext";
import { Suspense } from "react";
import clsx from "clsx";
import styles from "./layout.module.scss";

function SanctionLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <SanctionsContextProvider
        filters={{}}
        selectedSanction={null}
        selectedStat={""}
      >
        <div className={clsx(styles.container)}>{children}</div>
        <SanctionClientComponents />
      </SanctionsContextProvider>
    </Suspense>
  );
}

export default SanctionLayout;
