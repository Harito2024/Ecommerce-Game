import { Button, Icon } from "semantic-ui-react";
import Link from "next/link";
import style from "./StepThree.module.scss";

export function StepThree() {
  return (
    <div className={style.stepThree}>
      <Icon name="check circle outline" />
      <h2>Compra Exitosa!!!</h2>

      <Button as={Link} href="/account" primary>
        Ver pedido
      </Button>
    </div>
  );
}
