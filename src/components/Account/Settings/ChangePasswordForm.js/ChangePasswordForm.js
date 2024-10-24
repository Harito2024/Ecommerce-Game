import styles from "./ChangePasswordForm.module.scss";
import { Form } from "semantic-ui-react";
import { User } from "@/api";
import { useAuth } from "@/hooks";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangePasswordForm.form";

const userCrtl = new User();
export function ChangePasswordForm() {
  const { user, logout } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCrtl.updateMe(user.id, { password: formValue.password });
        logout();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className={styles.form}>
      <label>ChangePassword</label>
      <Form.Input
        type="password"
        name="password"
        placeholder="Nueva Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      ></Form.Input>
      <Form.Input
        type="password"
        name="repeatPassword"
        placeholder="Repetir Contraseña"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword}
      ></Form.Input>
      <Form.Button type="submit" loading={formik.isSubmitting}>
        Enviar
      </Form.Button>
    </Form>
  );
}
