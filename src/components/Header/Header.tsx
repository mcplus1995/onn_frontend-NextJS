import { getNavigation } from "@/utils/directus";
import clsx from "clsx";
import NavBar from "../NavBar/NavBar";
import styles from "./Header.module.scss";

async function Header() {
  const data = await getNavigation("main_navigation");
  return (
    <section className={clsx(styles.container, "navbar", "is-fixed-top")}>
      <NavBar data={data} />
    </section>
  );
}

export default Header;
