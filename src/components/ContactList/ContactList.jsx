import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";

import styles from "./contact-list.module.css";

const ContactsList = () => {
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

  // масив відфільтрованих контактів

  return (
    <ol className={styles.list}>
      {items.map((item) => (
        <li key={item.id}>
          <Contact item={item} />
        </li>
      ))}
    </ol>
  );
};

export default ContactsList;
