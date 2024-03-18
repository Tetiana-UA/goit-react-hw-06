import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./contacts-form.module.css";

const ContactsForm = ({ onSubmitForm }) => {
  const contactNameId = useId();
  const contactNumberId = useId();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
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
        </div>
        <button className={styles.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactsForm;
