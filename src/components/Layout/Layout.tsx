import { FC, HTMLAttributes } from "react";

import { getGlobals } from "@/utils/directus";
import clsx from "clsx";
import BackToTop from "../BackToTop/BackToTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import OEFBlock from "../OEFBlock/OEFBlock";
import styles from "./Layout.module.scss";

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  container?: boolean;
  isLoading?: boolean;
  loadingComponent?: JSX.Element;
  backToTop?: boolean;
};

const Layout: FC<LayoutProps> = async ({
  className,
  children,
  backToTop,
  ...other
}): Promise<JSX.Element> => {
  const { oef_content, oef_cta_label, oef_cta_link, oef_display_cta } =
    await getGlobals();

  return (
    <div
      className={clsx(styles.container, className, "fixed-navbar")}
      {...other}
    >
      <Header></Header>

      <main className={clsx(styles.mainContent, "section")}>{children}</main>
      <OEFBlock
        content={oef_content || ""}
        ctaLabel={oef_cta_label || ""}
        ctaLink={oef_cta_link || ""}
        displayCTA={oef_display_cta || false}
      />
      <Footer />
      {backToTop && <BackToTop />}
    </div>
  );
};

export default Layout;
