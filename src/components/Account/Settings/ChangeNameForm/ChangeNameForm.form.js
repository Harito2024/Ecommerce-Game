import * as Yup from "yup";

export function initialValues(firtsname, lastname) {
  return {
    firtsname,
    lastname,
  };
}

export function validationSchema() {
  return Yup.object({
    firtsname: Yup.string().required(true),
    lastname: Yup.string().required(true),
  });
}
