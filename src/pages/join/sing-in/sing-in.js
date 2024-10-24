import Link from "next/link";
import styles from "./sing-in.module.scss";
import { JoinLayout } from "@/layouts";
import { LoginForm } from "@/components/Auth";
export default function SingInPage() {
  return (
    <>
      <JoinLayout>
        <div className={styles.singIn}>
          <h3>Iniciar Sesion</h3>
          <LoginForm></LoginForm>
          <div className={styles.actions}>
            <Link href="/join/sing-up">Aun no tienes cuenta activa</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}
