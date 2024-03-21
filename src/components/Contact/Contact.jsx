import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice.js";

import styles from "./contact.module.css";

const Contact = ({ item }) => {
  const dispatch = useDispatch();
  //видадення контакту (dispatch відправляє action deleteContact (import з contactsSlice.js) в store )
  const onDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  //відмальовуємо картку 1 контакту
  return (
    <div className={styles.li}>
      {item.name}: {item.number}
      <button
        className={styles.liButton}
        onClick={() => onDeleteContact(item.id)}
        //onClick={onDeleteContact}
        type="button"
      >
        Delete
      </button>
    </div>
  );
};
export default Contact;
