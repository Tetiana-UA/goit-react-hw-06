import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice.js";

import styles from "./contact.module.css";

const Contact = ({ id, name, number }) => {
  const contacts = useSelector((state) => state.contacts.items);
  const dispatch = useDispatch();
  //видадення контакту (dispatch відправляє action deleteContact (import з contactsSlice.js) в store )
  const onDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };
  console.log(deleteContact);

  //відмальовуємо картку 1 контакту
  return (
    <div className={styles.li}>
      {name}: {number}
      <button
        className={styles.liButton}
        onClick={() => onDeleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </div>
  );
};
export default Contact;
