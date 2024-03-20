import { useSelector } from "react-redux";

import styles from "./contact-list.module.css";

const ContactsList = ({ removeContact }) => {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  //фільтрація контактів за значенням фільтру
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  };

  const items = getFilteredContacts();

  //відмальовуємо масив відфільтрованих контактів
  const elements = items.map(({ id, name, number }) => (
    <li className={styles.listLi} key={id}>
      {name}: {number}
      <button
        className={styles.listButton}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ol className={styles.list}>{elements}</ol>;
};
export default ContactsList;
