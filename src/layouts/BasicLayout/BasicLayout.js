import styles from "./BasucLayout.module.scss";
import { Container } from "semantic-ui-react";
import classNames from "classnames";
import { TopBar, Footer } from "@/components/Layout";

export function BasicLayout(props) {
  const {
    children,
    isOpenSearch = false,
    isContainer = false,
    relative,
  } = props;

  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} />

      <Container fluid>
        <div className={classNames({ [styles.relative]: relative })}></div>
        {isContainer ? <Container>{children}</Container> : children}
      </Container>

      <Footer></Footer>
    </>
  );
}
