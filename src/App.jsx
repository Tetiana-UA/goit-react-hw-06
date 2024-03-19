import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import ContactsForm from "./components/ContactsForm/ContactsForm";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import { addContact, deleteContact } from "./redux/contactsSlice";
import { setNewFilter } from "./redux/filtersSlice";

import styles from "./app.module.css";

const App = () => {
  //const [contacts, setContacts] = useState(() => {
  // const data = JSON.parse(localStorage.getItem("my-contacts"));
  // return data || [];
  //});
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const dispatch = useDispatch();

  //const [filter, setFilter] = useState("");
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem("my-contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

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

  //додаємо контакт при сабміті форми функція передається як пропс onSubmitForm  для форми Formik
  const onAddContact = (data) => {
    if (isDublicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} already in list`
      );
    }

    //const newContact = {
    // id: nanoid(),
    // ...data,
    //};

    //setContacts((prevContacts) => [...prevContacts, newContact]);
    dispatch(addContact(data));
  };

  //видадення контакту (dispatch відправляє action deleteContact (import з contactsSlice.js) в store )
  const onDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  //запис значення інпуту фільтрації
  const changeFilter = ({ target }) => dispatch(setNewFilter(target.value));

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
  console.log(items);

  return (
    <div className={styles.wraper}>
      <h2 className={styles.title}>PhoneBook</h2>
      <ContactsForm onSubmitForm={onAddContact} />

      <h2 className={styles.title}>Contacts</h2>
      <Filter changeFilter={changeFilter} filter={filter} />
      <ContactsList items={items} removeContact={onDeleteContact} />
    </div>
  );
};

export default App;
