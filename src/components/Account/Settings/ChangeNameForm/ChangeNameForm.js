import style from "./ChangeNameForm.module.scss";
import { Form } from "semantic-ui-react";
import { useAuth } from "@/hooks";
import { User } from "@/api";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeNameForm.form";

const userCtrl = new User();

export function ChangeNameForm() {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(user.firtsname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userCtrl.updateMe(user.id, formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Cambiar Nombre y/o Apellido</label>
      <div className={style.content}>
        <Form.Input
          name="firtsname"
          placeholder="Nombre"
          value={formik.values.firtsname}
          onChange={formik.handleChange}
          error={formik.errors.firtsname}
        ></Form.Input>
        <Form.Input
          name="lastname"
          placeholder="Apellido"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        ></Form.Input>
        <Form.Button type="submit" loading={formik.isSubmitting}>
          Enviar
        </Form.Button>
      </div>
    </Form>
  );
}
