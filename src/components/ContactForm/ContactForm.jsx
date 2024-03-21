import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

import styles from "./contact-form.module.css";

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
const ContactsForm = () => {
  const contactNameId = useId();
  const contactNumberId = useId();

  const contacts = useSelector((state) => state.contacts.items);

  const dispatch = useDispatch();

  //Перевіряємо на повтори контактів при введенні
  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    const dublicate = contacts.find((item) => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();

      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentNumber === normalizedNumber
      );
    });
    return Boolean(dublicate);
  };

  //додаємо контакт при сабміті форми (ця функція передається як пропс  для форми Formik)
  const onAddContact = (data) => {
    if (isDublicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} already in list`
      );
    }
    //dispatch відправляє action addContact - функцію, яка створює обєкт (import з contactsSlice.js) в reducer (описаний в contactsSlice.js), який потім обробляє action і змінює store
    dispatch(addContact(data));
  };
  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={(values, actions) => {
        onAddContact(values);
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
