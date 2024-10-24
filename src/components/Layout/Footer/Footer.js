import style from "./Footer.module.scss";
import { Container, Image, Button } from "semantic-ui-react";
import Link from "next/link";

export function Footer() {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.columns}>
          <div>
            <Link href="/">
              <Image src="/images/logo.png" alt="Gaming"></Image>
            </Link>
          </div>

          <div>
            <ul>
              <Link as={Link} href="#">
                Terminos y Condiciones
              </Link>
              <Link as={Link} href="#">
                Politica de Privacidad
              </Link>
              <Link as={Link} href="#">
                Contactos
              </Link>
              <Link as={Link} href="#">
                FAQs
              </Link>
            </ul>
          </div>

          <div className={style.social}>
            <Button as="a" href="#" circular color="facebook" icon="facebook" />
            <Button as="a" href="#" circular color="twitter" icon="twitter" />
            <Button as="a" href="#" circular color="linkedin" icon="linkedin" />
            <Button as="a" href="#" circular color="youtube" icon="youtube" />
          </div>
        </div>
        <div className={style.copyright}>
          <span>Copyright © - 2024 Gaming - All rights reserved</span>
        </div>
      </Container>
    </div>
  );
}
