import styles from "./Footer.module.scss";

function Footer() {
  const date = new Date();

  return (
    <footer className={styles.footer}>
      <div className="container py-5">
        <div className="is-flex is-justify-content-space-between is-flex-wrap-wrap">
          <div className={styles.col}>
            Open Nuclear Network
            <br />
            One Earth Future Austria -<br />
            Verein zur Prävention und <br />
            Klärung bewaffneter Konflikte
          </div>
          <div className={styles.col}>
            Phone: +43 1 226 39 39
            <br />
            Fax: +43 1 226 39 39 30
            <br />
            Email:{" "}
            <a href="mailto:onn@oneearthfuture.org">onn@oneearthfuture.org</a>
            <br />
            Website: <a href="opennuclear.org">opennuclear.org</a> <br />
          </div>

          <div className={styles.col}>
            Address:
            <br />
            Argentinierstrasse 21/9
            <br />
            1040 Vienna
            <br />
            Austria
            <br />
            <br />
          </div>

          <div className={styles.col}></div>
        </div>

        <div className="has-text-white is-size-7 mt-4">
          © {date.getFullYear()} One Earth Future Foundation
        </div>
      </div>
    </footer>
  );
}

export default Footer;
