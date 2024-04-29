import Logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={Logo.src}
          width={Logo.width}
          height={Logo.height}
          alt="ONN Logo"
        />
      </div>
      <h1 className={styles.headline}>Not Found</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
