import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import ContactsForm from "./components/ContactForm/ContactForm";
import ContactsList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";

import styles from "./app.module.css";

// Переписуємо книгу контактів на Redux Toolkit
const App = () => {
  const contacts = useSelector((state) => state.contacts.items);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem("my-contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  //запис значення інпуту для фільтрації
  //const changeFilter = ({ target }) => dispatch(setNewFilter(target.value));

  return (
    <div className={styles.wraper}>
      <h2 className={styles.title}>PhoneBook</h2>
      <ContactsForm />
      <SearchBox />
      <ContactsList />
    </div>
  );
};

export default App;
