import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from "./contacts-form.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

// Kомпонент Форма контактів
const ContactsForm = ({ onSubmitForm }) => {
  const contactNameId = useId();
  const contactNumberId = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onSubmitForm(values);
        actions.resetForm();
      }}
    >
      <Form className={styles.form}>
        <div className={styles.formElement}>
          <label className={styles.formLabel} htmlFor={contactNameId}>
            Name
          </label>
          <Field
            className={styles.formInput}
            type="text"
            name="name"
            required
            id={contactNameId}
          />
          <ErrorMessage className={styles.error} name="name" component="span" />
        </div>
        <div className={styles.formElement}>
          <label className={styles.formLabel} htmlFor={contactNumberId}>
            Number
          </label>
          <Field
            className={styles.formInput}
            type="tel"
            name="number"
            required
            id={contactNumberId}
          />
          <ErrorMessage
            className={styles.error}
            name="number"
            component="span"
          />
        </div>
        <button className={styles.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactsForm;
