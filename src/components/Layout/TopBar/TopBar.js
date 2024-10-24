import styles from "./TopBar.module.scss";
import { Image } from "semantic-ui-react";
import Link from "next/link";
import { Account } from "../Account";
import { Menu } from "../Menu";

export function TopBar(props) {
  const { isOpenSearch } = props;

  return (
    <div className={styles.topBar}>
      <div className={styles.left}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Gaming"></Image>
        </Link>
      </div>

      <div className={styles.center}>
        <Menu isOpenSearch={isOpenSearch}></Menu>
      </div>

      <div className={styles.right}>
        <Account></Account>
      </div>
    </div>
  );
}
